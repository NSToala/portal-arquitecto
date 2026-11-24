import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';

/** Botón flotante "ir arriba". Aparece al bajar y un anillo dorado muestra el avance de la página. */
@Component({
  selector: 'app-back-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="to-top"
      [class.to-top--show]="visible()"
      [attr.tabindex]="visible() ? 0 : -1"
      [attr.aria-hidden]="!visible()"
      aria-label="Volver arriba"
      (click)="goTop()"
    >
      <svg class="to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="to-top__track" cx="24" cy="24" r="22" />
        <circle
          class="to-top__bar"
          cx="24"
          cy="24"
          r="22"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="offset()"
        />
      </svg>
      <svg class="to-top__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  `,
})
export class BackToTop {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly circumference = 2 * Math.PI * 22;
  private readonly progress = signal(0);
  protected readonly visible = signal(false);
  protected readonly offset = computed(() => this.circumference * (1 - this.progress()));

  constructor() {
    afterNextRender(() => {
      let ticking = false;
      const update = () => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.progress.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        this.visible.set(window.scrollY > 500);
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }

  protected goTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
