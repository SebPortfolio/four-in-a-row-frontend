import { Component } from '@angular/core';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';
import { RotuingObj } from '../../common/types';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MenuTemplateComponent],
    templateUrl: './einstellungen-menu.component.html',
    styleUrl: './einstellungen-menu.component.less',
})
export class EinstellungenMenuComponent {
    titel: string = 'Einstellungen';
    menuPoints: RotuingObj[] = [
        { label: 'Gameplay', route: 'gameplay' },
        { label: 'Grafik', route: 'grafics' },
        { label: 'Audio', route: 'audio' },
        { label: 'Video', route: 'video' },
        { label: 'Zurück zum Hauptmenü', route: '..' },
    ];
}
