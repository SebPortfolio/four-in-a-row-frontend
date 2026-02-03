import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '/inital-angular-site',
    loadComponent: () =>
      import('./sonstiges/inital-angular-site/inital-angular-site.component').then(m => m.InitalAngularSiteComponent),
  },
];
