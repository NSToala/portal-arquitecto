import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCategory } from '../data/models';
import { PROJECTS } from '../data/projects';
import { Media } from '../shared/media';
import { Reveal } from '../shared/reveal';

type Filter = 'Todos' | ProjectCategory;

@Component({
  selector: 'app-projects',
  imports: [RouterLink, Media, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head container">
      <p class="eyebrow">Portafolio</p>
      <h1>Proyectos</h1>
    </section>

    <section class="container">
      <div class="filters" role="group" aria-label="Filtrar por categoría">
        @for (f of filters; track f) {
          <button type="button" [class.active]="selected() === f" (click)="selected.set(f)">{{ f }}</button>
        }
      </div>

      <div class="grid grid--3 section">
        @for (p of visible(); track p.id; let i = $index) {
          <a class="card" [routerLink]="['/proyectos', p.id]" [appReveal]="(i % 3) * 120">
            <app-media class="card__media" [src]="p.image" [tone]="p.tone" [label]="p.title" />
            <h3>{{ p.title }}</h3>
            <p class="muted">{{ p.category }} · {{ p.year }}</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly filters: Filter[] = ['Todos', 'Residencial', 'Comercial', 'Interiorismo', 'Remodelación'];
  protected readonly selected = signal<Filter>('Todos');
  protected readonly visible = computed(() =>
    this.selected() === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.category === this.selected()),
  );
}
