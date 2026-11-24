import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTop } from './layout/back-to-top';
import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  imports: [RouterOutlet, Header, Footer, BackToTop],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-back-to-top />
  `,
})
export class App {}
