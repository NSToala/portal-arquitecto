import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Parallax para la portada. Publica dos variables CSS en el elemento:
 * --py   desplazamiento en px (la imagen de fondo baja más lento que la página)
 * --fade opacidad del contenido (1 arriba, 0 al salir de pantalla)
 */
@Directive({ selector: '[appParallax]' })
export class Parallax {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let ticking = false;
      const update = () => {
        ticking = false;
        const h = this.el.offsetHeight || 1;
        const y = Math.min(window.scrollY, h * 1.2);
        this.el.style.setProperty('--py', `${(y * 0.3).toFixed(1)}px`);
        this.el.style.setProperty('--fade', Math.max(0, 1 - y / (h * 0.75)).toFixed(3));
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
}
