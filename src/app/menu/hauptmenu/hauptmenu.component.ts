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
        { label: 'HAUPTMENU.EINZELSPIELER', route: 'singleplayer', absolutePath: true },
        { label: 'HAUPTMENU.MEHRSPIELER_LOKAL', route: 'local', absolutePath: true },
        { label: 'HAUPTMENU.MEHRSPIELER_ONLINE', route: 'online', absolutePath: true },
        { label: 'HAUPTMENU.EINSTELLUNGEN', route: 'settings', absolutePath: true },
        { label: 'HAUPTMENU.SPIELER', route: 'players', absolutePath: true },
        { label: 'HAUPTMENU.HILFE', route: 'help', absolutePath: true },
        { label: 'HAUPTMENU.UEBER_UNS', route: 'about-us', absolutePath: true },
        { label: 'Initiale Angular Seite', route: 'inital-angular-site', absolutePath: true },
    ];
}
