import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../data/site';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer__grid">
        <div>
          <img class="footer__logo" src="images/logo-claro.png" [alt]="site.brand" />
          <p class="muted">{{ site.tagline }}</p>
        </div>
        <div>
          <p class="eyebrow">Contacto</p>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
          <p>{{ site.phone }}</p>
          <p>{{ site.city }}</p>
        </div>
        <div>
          <p class="eyebrow">Sitio</p>
          <p><a routerLink="/proyectos">Proyectos</a></p>
          <p><a routerLink="/catalogo">Catálogo</a></p>
          <p><a routerLink="/contacto">Contacto</a></p>
        </div>
        <div>
          <p class="eyebrow">Redes</p>
          <p><a [href]="site.instagram" target="_blank" rel="noopener">Instagram</a></p>
          <p><a [href]="site.facebook" target="_blank" rel="noopener">Facebook</a></p>
          <p><a [href]="site.linkedin" target="_blank" rel="noopener">LinkedIn</a></p>
        </div>
      </div>
      <div class="container footer__bottom">
        <span>© {{ year }} {{ site.brand }}. Todos los derechos reservados.</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
