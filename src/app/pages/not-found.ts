import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head container">
      <p class="eyebrow">404</p>
      <h1>Página no encontrada</h1>
      <a class="link" routerLink="/">← Volver al inicio</a>
    </section>
  `,
})
export class NotFound {}
