import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Inicio | Vovo Studio', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'proyectos', title: 'Proyectos | Vovo Studio', loadComponent: () => import('./pages/projects').then((m) => m.Projects) },
  { path: 'proyectos/:id', title: 'Proyecto | Vovo Studio', loadComponent: () => import('./pages/project-detail').then((m) => m.ProjectDetail) },
  { path: 'catalogo', title: 'Catálogo | Vovo Studio', loadComponent: () => import('./pages/catalog').then((m) => m.Catalog) },
  { path: 'catalogo/:id', title: 'Mueble | Vovo Studio', loadComponent: () => import('./pages/furniture-detail').then((m) => m.FurnitureDetail) },
  { path: 'sobre-nosotros', title: 'Sobre nosotros | Vovo Studio', loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'sobre-mi', redirectTo: 'sobre-nosotros' },
  { path: 'contacto', title: 'Contacto | Vovo Studio', loadComponent: () => import('./pages/contact').then((m) => m.Contact) },
  { path: '**', title: 'No encontrado', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
