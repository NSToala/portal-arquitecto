import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FURNITURE } from '../data/furniture';
import { Media } from '../shared/media';

@Component({
  selector: 'app-furniture-detail',
  imports: [RouterLink, Media],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (item(); as f) {
      <section class="container section furniture">
        <app-media class="furniture__media" [src]="f.image" [tone]="f.tone" [label]="f.title" />
        <div>
          <a class="link" routerLink="/catalogo">← Catálogo</a>
          <p class="eyebrow">{{ f.category }}</p>
          <h1>{{ f.title }}</h1>
          <p class="lead">{{ f.summary }}</p>
          <dl class="specs">
            <div><dt>Materiales</dt><dd>{{ f.materials }}</dd></div>
            <div><dt>Medidas</dt><dd>{{ f.dimensions }}</dd></div>
            <div><dt>Acabado</dt><dd>{{ f.finish }}</dd></div>
          </dl>
          <p class="muted">Todas las piezas se fabrican a medida. Escríbenos para comentar tu proyecto.</p>
          <a class="btn" routerLink="/contacto">Consultar</a>
        </div>
      </section>
    } @else {
      <section class="page-head container">
        <h1>Mueble no encontrado</h1>
        <a class="link" routerLink="/catalogo">← Volver al catálogo</a>
      </section>
    }
  `,
})
export class FurnitureDetail {
  readonly id = input.required<string>();
  protected readonly item = computed(() => FURNITURE.find((f) => f.id === this.id()));
}
