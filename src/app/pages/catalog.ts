import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FURNITURE } from '../data/furniture';
import { FurnitureCategory } from '../data/models';
import { Media } from '../shared/media';

type Filter = 'Todos' | FurnitureCategory;

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, Media],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head container">
      <p class="eyebrow">Mobiliario a medida</p>
      <h1>Catálogo</h1>
      <p class="lead">Una muestra de los muebles que diseñamos y fabricamos. Cada pieza se adapta a tu espacio.</p>
    </section>

    <section class="container">
      <div class="filters" role="group" aria-label="Filtrar por categoría">
        @for (f of filters; track f) {
          <button type="button" [class.active]="selected() === f" (click)="selected.set(f)">{{ f }}</button>
        }
      </div>

      <div class="grid grid--4 section">
        @for (f of visible(); track f.id) {
          <a class="card" [routerLink]="['/catalogo', f.id]">
            <app-media class="card__media card__media--tall" [src]="f.image" [tone]="f.tone" [label]="f.title" />
            <h3>{{ f.title }}</h3>
            <p class="muted">{{ f.category }}</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class Catalog {
  protected readonly filters: Filter[] = ['Todos', 'Cocinas', 'Closets', 'Sala y comedor', 'Escritorios', 'Baños'];
  protected readonly selected = signal<Filter>('Todos');
  protected readonly visible = computed(() =>
    this.selected() === 'Todos' ? FURNITURE : FURNITURE.filter((f) => f.category === this.selected()),
  );
}
