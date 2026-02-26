import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';
import { authGuard } from './core/guards/auth.guard';
import { gameModeGuard } from './core/guards/game-mode.guard';
import { meGuard } from './core/guards/me.guard';
import { EinstellungenMenuComponent } from './menu/einstellungen-menu/einstellungen-menu.component';
import { EinzelspielerMenuComponent } from './menu/einzelspieler-menu/einzelspieler-menu.component';
import { GameCreationComponent } from './menu/game-creation/game-creation.component';
import { GameLoadingComponent } from './menu/game-loading/game-loading.component';
import { HauptmenuComponent } from './menu/hauptmenu/hauptmenu.component';
import { MehrspielerLokalMenuComponent } from './menu/mehrspieler-lokal-menu/mehrspieler-lokal-menu.component';
import { PlayerOverviewComponent } from './player/player-overview/player-overview.component';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';
import { SpielManagementComponent } from './spiel/spiel-management/spiel-management.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: HauptmenuComponent },
            { path: 'singleplayer', component: EinzelspielerMenuComponent },
            { path: 'local', component: MehrspielerLokalMenuComponent },
            { path: 'settings', component: EinstellungenMenuComponent },
            { path: ':gameMode/new', component: GameCreationComponent },
            { path: ':gameMode/load', component: GameLoadingComponent },
            { path: ':gameMode/games', component: SpielManagementComponent, canActivate: [gameModeGuard] },
            { path: ':gameMode/games/:gameId', component: SpielManagementComponent, canActivate: [gameModeGuard] },
            { path: 'players', component: PlayerOverviewComponent },
            {
                path: 'players/me',
                component: PlayerProfileComponent,
                canActivate: [meGuard],
            },
            { path: 'players/:playerId', component: PlayerProfileComponent },
            {
                path: 'inital-angular-site',
                loadComponent: () =>
                    import('./sonstiges/inital-angular-site/inital-angular-site.component').then(
                        m => m.InitalAngularSiteComponent
                    ),
            },
            // TODO: später mit 404 Seite ersetzen
            { path: '**', redirectTo: 'dashboard' },
        ],
    },
    { path: '**', redirectTo: 'login' },
];
