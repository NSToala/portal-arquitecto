import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../data/projects';
import { Media } from '../shared/media';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, Media],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (project(); as p) {
      <section class="page-head container">
        <a class="link" routerLink="/proyectos">← Proyectos</a>
        <p class="eyebrow">{{ p.category }}</p>
        <h1>{{ p.title }}</h1>
      </section>

      <div class="container">
        <app-media class="detail__hero" [src]="p.image" [tone]="p.tone" [label]="p.title" />
      </div>

      <section class="container detail section">
        <dl class="facts">
          <div><dt>Año</dt><dd>{{ p.year }}</dd></div>
          <div><dt>Ubicación</dt><dd>{{ p.location }}</dd></div>
          <div><dt>Superficie</dt><dd>{{ p.area }}</dd></div>
          <div><dt>Categoría</dt><dd>{{ p.category }}</dd></div>
        </dl>
        <div class="detail__text">
          <p class="lead">{{ p.summary }}</p>
          @for (para of p.description; track $index) {
            <p>{{ para }}</p>
          }
        </div>
      </section>

      <section class="container section">
        <div class="grid grid--2">
          <app-media class="card__media" [tone]="p.tone" label="Imagen 2" />
          <app-media class="card__media" [tone]="p.tone" label="Imagen 3" />
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <h2>¿Quieres algo similar?</h2>
          <a class="btn btn--light" routerLink="/contacto">Contáctanos</a>
        </div>
      </section>
    } @else {
      <section class="page-head container">
        <h1>Proyecto no encontrado</h1>
        <a class="link" routerLink="/proyectos">← Volver a proyectos</a>
      </section>
    }
  `,
})
export class ProjectDetail {
  readonly id = input.required<string>();
  protected readonly project = computed(() => PROJECTS.find((p) => p.id === this.id()));
}
