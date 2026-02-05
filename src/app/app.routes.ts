import { Routes } from '@angular/router';
import { HauptmenuComponent } from './menu/hauptmenu/hauptmenu.component';
import { EinzelspielerMenuComponent } from './menu/einzelspieler-menu/einzelspieler-menu.component';
import { EinstellungenMenuComponent } from './menu/einstellungen-menu/einstellungen-menu.component';
import { gameModeGuard } from './sonstiges/game-mode.guard';
import { SpielManagementComponent } from './spiel/spiel-management/spiel-management.component';

export const routes: Routes = [
    { path: '', component: HauptmenuComponent },
    { path: 'singleplayer', component: EinzelspielerMenuComponent },
    { path: 'settings', component: EinstellungenMenuComponent },
    { path: ':gameMode/games/:gameId', component: SpielManagementComponent, canActivate: [gameModeGuard] },
    {
        path: 'inital-angular-site',
        loadComponent: () =>
            import('./sonstiges/inital-angular-site/inital-angular-site.component').then(
                m => m.InitalAngularSiteComponent
            ),
    },
    // TODO: später mit 404 Seite ersetzen
    { path: '**', redirectTo: '' },
];
