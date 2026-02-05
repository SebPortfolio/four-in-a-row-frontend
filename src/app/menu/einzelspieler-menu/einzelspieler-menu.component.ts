import { Component } from '@angular/core';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';
import { RotuingObj } from '../../common/types';

@Component({
    selector: 'app-singleplayer-menu',
    standalone: true,
    imports: [MenuTemplateComponent],
    templateUrl: './einzelspieler-menu.component.html',
    styleUrl: './einzelspieler-menu.component.less',
})
export class EinzelspielerMenuComponent {
    titel: string = 'Einzelspieler';
    menuPoints: RotuingObj[] = [
        { label: 'Neues Spiel', route: 'new' },
        { label: 'Spiel laden', route: 'load' },
        { label: 'Zurück zum Hauptmenü', route: '..' },
    ];
}
