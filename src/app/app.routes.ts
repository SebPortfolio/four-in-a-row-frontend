import { Routes } from '@angular/router';
import { HauptmenuComponent } from './menu/hauptmenu/hauptmenu.component';
import { EinzelspielerMenuComponent } from './menu/einzelspieler-menu/einzelspieler-menu.component';
import { EinstellungenMenuComponent } from './menu/einstellungen-menu/einstellungen-menu.component';

export const routes: Routes = [
  { path: '', component: HauptmenuComponent },
  { path: 'singleplayer', component: EinzelspielerMenuComponent },
  { path: 'settings', component: EinstellungenMenuComponent },
  {
    path: 'inital-angular-site',
    loadComponent: () =>
      import('./sonstiges/inital-angular-site/inital-angular-site.component').then(m => m.InitalAngularSiteComponent),
  },
  // TODO: später mit 404 Seite ersetzen
  { path: '**', redirectTo: '' },
];
