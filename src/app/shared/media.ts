import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

/** Muestra una imagen o, si no existe o falla al cargar, un bloque de color de muestra. */
@Component({
  selector: 'app-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'media', '[style.--tone]': 'tone()' },
  template: `
    @if (showImage()) {
      <img [src]="src()" [alt]="label()" loading="lazy" (error)="failed.set(true)" />
    } @else {
      <div class="media__ph"><span>{{ label() }}</span></div>
    }
  `,
})
export class Media {
  readonly src = input<string | undefined>();
  readonly label = input('');
  readonly tone = input('#8c8579');

  protected readonly failed = signal(false);
  protected readonly showImage = computed(() => !!this.src() && !this.failed());
}
