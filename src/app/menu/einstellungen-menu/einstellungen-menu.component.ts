import { Component } from '@angular/core';
import { RoutingObj } from '../../common/types';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MenuTemplateComponent],
    templateUrl: './einstellungen-menu.component.html',
    styleUrl: './einstellungen-menu.component.less',
})
export class EinstellungenMenuComponent {
    titel: string = 'Einstellungen';
    menuPoints: RoutingObj[] = [
        { label: 'Gameplay', route: 'gameplay' },
        { label: 'Grafik', route: 'grafics' },
        { label: 'Audio', route: 'audio' },
        { label: 'Video', route: 'video' },
        { label: 'Zurück zum Hauptmenü', route: '..' },
    ];
}
