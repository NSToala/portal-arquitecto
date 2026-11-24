import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Aparece suavemente cuando el elemento entra en pantalla. Uso: `appReveal` o `[appReveal]="150"` (retraso en ms). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal implements OnInit, OnDestroy {
  readonly delay = input<number | string>('', { alias: 'appReveal' });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const ms = Number(this.delay()) || 0;
    if (ms) this.el.style.transitionDelay = `${ms}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('reveal--in');
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.classList.add('reveal--in');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
