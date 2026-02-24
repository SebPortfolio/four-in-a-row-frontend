import { Component } from '@angular/core';
import { RoutingObj } from '../../common/types';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';

@Component({
    selector: 'app-mehrspieler-lokal-menu',
    standalone: true,
    imports: [MenuTemplateComponent],
    templateUrl: './mehrspieler-lokal-menu.component.html',
    styleUrl: './mehrspieler-lokal-menu.component.less',
})
export class MehrspielerLokalMenuComponent {
    titel: string = 'Hauptmenü';
    menuPoints: RoutingObj[] = [
        { label: 'Neues Spiel', route: 'new' },
        { label: 'Spiel laden', route: 'load' },
        { label: 'Zurück zum Hauptmenü', route: '..' },
    ];
}
