import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FURNITURE } from '../data/furniture';
import { PROJECTS } from '../data/projects';
import { STATS, TEAM } from '../data/site';
import { Media } from '../shared/media';
import { Parallax } from '../shared/parallax';
import { ProcessSteps } from '../shared/process-steps';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Media, Parallax, ProcessSteps, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" appParallax>
      <app-media class="hero__media" src="images/ref/hero.jpg" tone="#4a443c" label="Casa moderna rodeada de árboles" />
      <div class="hero__overlay"></div>
      <div class="hero__lines" aria-hidden="true"></div>
      <div class="container hero__content">
        <p class="eyebrow eyebrow--light hero__eyebrow">Arquitectura · Interiorismo · Mobiliario</p>
        <h1 class="hero__title">Espacios pensados<br /><em>para vivirse.</em></h1>
        <div class="hero__actions">
          <a class="btn btn--light" routerLink="/proyectos">Ver proyectos</a>
          <a class="btn btn--ghost" routerLink="/contacto">Hablemos</a>
        </div>
      </div>
      <a class="hero__scroll" href="#intro" aria-label="Bajar al contenido"><span></span></a>
    </section>

    <section id="intro" class="section container intro">
      <div class="intro__grid">
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
        <div>
          <p class="lead lead--xl" appReveal="100">
            Diseñamos y construimos arquitectura y mobiliario a medida. Cada proyecto parte de escuchar
            cómo vives o trabajas, y termina en espacios sobrios, funcionales y bien resueltos.
          </p>
          <a class="link" routerLink="/sobre-nosotros" appReveal="200">Conocer más →</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container stats__grid">
        @for (s of stats; track s.label; let i = $index) {
          <div class="stat" [appReveal]="i * 100">
            <span class="stat__value">{{ s.value }}</span>
            <span class="stat__label">{{ s.label }}</span>
          </div>
        }
      </div>
    </section>

    <section class="section container">
      <div class="section__head" appReveal>
        <h2>Proyectos destacados</h2>
        <a class="link" routerLink="/proyectos">Ver todos →</a>
      </div>
      <div class="grid grid--bento">
        @for (p of projects; track p.id; let i = $index) {
          <a class="card" [routerLink]="['/proyectos', p.id]" [appReveal]="i * 120">
            <app-media class="card__media" [src]="p.image" [tone]="p.tone" [label]="p.title" />
            <div class="card__meta">
              <span class="card__index">0{{ i + 1 }}</span>
              <div>
                <h3>{{ p.title }}</h3>
                <p class="muted">{{ p.category }} · {{ p.year }}</p>
              </div>
              <span class="card__arrow" aria-hidden="true">→</span>
            </div>
          </a>
        }
      </div>
    </section>

    <section class="section section--tint">
      <div class="container">
        <div class="section__head" appReveal>
          <h2>Mobiliario a medida</h2>
          <a class="link" routerLink="/catalogo">Ver catálogo →</a>
        </div>
        <div class="grid grid--4">
          @for (f of furniture; track f.id; let i = $index) {
            <a class="card" [routerLink]="['/catalogo', f.id]" [appReveal]="i * 100">
              <app-media class="card__media card__media--tall" [src]="f.image" [tone]="f.tone" [label]="f.title" />
              <h3>{{ f.title }}</h3>
              <p class="muted">{{ f.category }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="section container">
      <p class="eyebrow" appReveal>Paso a paso</p>
      <h2 appReveal="80">Proceso de trabajo</h2>
      <app-process-steps />
    </section>

    <section class="cta">
      <div class="container" appReveal>
        <p class="eyebrow eyebrow--light">Siguiente paso</p>
        <h2>¿Tienes un proyecto en mente?</h2>
        <a class="btn btn--light" routerLink="/contacto">Escríbenos</a>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly team = TEAM;
  protected readonly stats = STATS;
  protected readonly projects = PROJECTS.filter((p) => p.featured);
  protected readonly furniture = FURNITURE.filter((f) => f.featured);
}
