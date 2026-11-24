import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROCESS } from '../data/site';
import { Media } from './media';

/**
 * Proceso de trabajo interactivo: lista de pasos a la izquierda y foto a la derecha.
 * El paso activo avanza solo (barra de progreso), se pausa al pasar el cursor o enfocar,
 * y se puede elegir con clic o con las flechas del teclado. Textos y fotos viven en PROCESS (data/site.ts).
 */
@Component({
  selector: 'app-process-steps',
  imports: [RouterLink, Media],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'process',
    '[class.process--paused]': 'paused()',
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'paused.set(false)',
    '(focusin)': 'paused.set(true)',
    '(focusout)': 'paused.set(false)',
  },
  template: `
    <div class="process__list" role="tablist" aria-orientation="vertical" (keydown)="onKey($event)">
      @for (s of steps; track s.title; let i = $index) {
        <button
          type="button"
          role="tab"
          class="pstep"
          [class.pstep--active]="i === active()"
          [id]="'pstep-' + i"
          [attr.aria-selected]="i === active()"
          [attr.aria-controls]="'process-panel'"
          [attr.tabindex]="i === active() ? 0 : -1"
          (click)="select(i)"
        >
          <span class="pstep__num" aria-hidden="true">0{{ i + 1 }}</span>
          <span class="pstep__body">
            <span class="pstep__title">{{ s.title }}</span>
            <span class="pstep__text">{{ s.text }}</span>
            @if (i === active()) {
              <span class="pstep__bar" aria-hidden="true"><i (animationend)="next()"></i></span>
            }
          </span>
        </button>
      }
      <a class="btn process__cta" routerLink="/contacto">Empezar mi proyecto</a>
    </div>

    <div class="process__visual" id="process-panel" role="tabpanel" [attr.aria-labelledby]="'pstep-' + active()">
      @for (s of steps; track s.title; let i = $index) {
        <app-media class="pv" [class.pv--on]="i === active()" [src]="s.image" tone="#6f6a62" [label]="s.title" />
      }
      <span class="process__chip">Paso 0{{ active() + 1 }} / 0{{ steps.length }}</span>
      <div class="process__cap">
        <span class="process__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            @switch (steps[active()].icon) {
              @case ('chat') {
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
                <path d="M9 11h6M9 14h3" />
              }
              @case ('pencil') {
                <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" />
                <path d="M14 7l3 3" />
              }
              @default {
                <path d="M3 21h18" />
                <path d="M5 21V9l7-5 7 5v12" />
                <path d="M10 21v-6h4v6" />
              }
            }
          </svg>
        </span>
        <span class="process__cap-title">{{ steps[active()].title }}</span>
      </div>
    </div>
  `,
})
export class ProcessSteps {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly steps = PROCESS;
  protected readonly active = signal(0);
  protected readonly paused = signal(false);

  protected select(i: number): void {
    this.active.set(i);
  }

  /** Lo llama la barra de progreso al terminar: pasa al siguiente paso y vuelve al primero. */
  protected next(): void {
    this.active.update((i) => (i + 1) % this.steps.length);
  }

  protected onKey(e: KeyboardEvent): void {
    const n = this.steps.length;
    let i = this.active();
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') i = (i + 1) % n;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') i = (i - 1 + n) % n;
    else return;
    e.preventDefault();
    this.active.set(i);
    this.host.querySelectorAll<HTMLElement>('[role="tab"]')[i]?.focus();
  }
}
