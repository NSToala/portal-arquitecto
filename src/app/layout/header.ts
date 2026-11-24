import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { SITE } from '../data/site';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header" [class.header--clear]="clear()">
      <div class="container header__inner">
        <a class="brand" routerLink="/" (click)="close()" [attr.aria-label]="site.brand + ', inicio'">
          <img class="brand__logo brand__logo--light" src="images/logo-claro.png" alt="" />
          <img class="brand__logo brand__logo--dark" src="images/logo-oscuro.png" [alt]="site.brand" />
        </a>

        <button
          class="menu-btn"
          type="button"
          [attr.aria-expanded]="open()"
          aria-controls="main-nav"
          (click)="toggle()"
        >
          {{ open() ? 'Cerrar' : 'Menú' }}
        </button>

        <nav id="main-nav" class="nav" [class.nav--open]="open()" aria-label="Principal">
          @for (item of links; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              (click)="close()"
              >{{ item.label }}</a
            >
          }
        </nav>
      </div>
    </header>
  `,
})
export class Header {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly site = SITE;
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly links = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/sobre-nosotros', label: 'Sobre nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Transparente solo sobre la portada y mientras no se ha hecho scroll. */
  protected readonly clear = computed(() => {
    const path = this.url().split(/[?#]/)[0];
    return path === '/' && !this.scrolled() && !this.open();
  });

  constructor() {
    afterNextRender(() => {
      const update = () => this.scrolled.set(window.scrollY > 40);
      update();
      window.addEventListener('scroll', update, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }
}
