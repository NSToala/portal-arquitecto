import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, TEAM } from '../data/site';
import { Media } from '../shared/media';
import { ProcessSteps } from '../shared/process-steps';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Media, ProcessSteps, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head container">
      <p class="eyebrow">Sobre nosotros</p>
      <h1>{{ site.brand }}</h1>
    </section>

    <section class="container about section">
      <div class="about__team">
        @for (m of team; track m.name; let i = $index) {
          <figure class="member" [appReveal]="i * 150">
            <app-media class="member__img" [src]="m.image" tone="#8c8c8c" [label]="'Retrato de ' + m.name" />
            <figcaption>
              <strong>{{ m.name }}</strong>
              <span>{{ m.role }}</span>
            </figcaption>
          </figure>
        }
      </div>
      <div class="about__text">
        <p class="lead">
          Somos un estudio de arquitectura que combina dos oficios: diseñar y construir espacios, y
          fabricar mobiliario a medida para completarlos.
        </p>
        <p>
          Texto de muestra. Aquí irá la historia del estudio: cómo nació, dónde estudiaron, cuántos años
          de experiencia suman, qué tipo de obras han dirigido y qué los motiva a trabajar con madera y
          diseño de interiores.
        </p>
        <p>
          Trabajar el proyecto y el mueble con el mismo equipo permite cuidar los detalles, controlar los
          costos y entregar espacios coherentes de principio a fin.
        </p>
        <ul class="values">
          <li>Diseño sobrio y funcional</li>
          <li>Materiales nobles y duraderos</li>
          <li>Atención directa en cada etapa</li>
          <li>Cumplimiento de plazos y presupuesto</li>
        </ul>
      </div>
    </section>

    <section class="section section--tint">
      <div class="container">
        <p class="eyebrow" appReveal>Paso a paso</p>
        <h2 appReveal="80">Cómo trabajamos</h2>
        <app-process-steps />
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Hablemos de tu proyecto</h2>
        <a class="btn btn--light" routerLink="/contacto">Contacto</a>
      </div>
    </section>
  `,
})
export class About {
  protected readonly site = SITE;
  protected readonly team = TEAM;
}
