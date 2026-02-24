import { Component } from '@angular/core';
import { RoutingObj } from '../../common/types';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [MenuTemplateComponent],
    templateUrl: './hauptmenu.component.html',
    styleUrl: './hauptmenu.component.less',
})
export class HauptmenuComponent {
    titel: string = 'Hauptmenü';
    menuPoints: RoutingObj[] = [
        { label: 'Einzelspieler', route: 'singleplayer', absolutePath: true },
        { label: 'Mehrspieler (lokal)', route: 'local', absolutePath: true },
        { label: 'Mehrspieler (online)', route: 'online', absolutePath: true },
        { label: 'Einstellungen', route: 'settings', absolutePath: true },
        { label: 'Spieler', route: 'players', absolutePath: true },
        { label: 'Hilfe', route: 'help', absolutePath: true },
        { label: 'Über uns', route: 'about-us', absolutePath: true },
        { label: 'Initiale Angular Seite', route: 'inital-angular-site', absolutePath: true },
    ];
}
