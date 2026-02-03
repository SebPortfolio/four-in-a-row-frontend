import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuTemplateComponent } from '../menu-template/menu-template.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, MenuTemplateComponent],
  templateUrl: './hauptmenu.component.html',
  styleUrl: './hauptmenu.component.less',
})
export class HauptmenuComponent {
  titel: string = 'Hauptmenü';
  menuPoints: { label: string; route: string }[] = [
    { label: 'Einzelspieler', route: 'singleplayer' },
    { label: 'Mehrspieler (lokal)', route: 'multiplayer-local' },
    { label: 'Einstellungen', route: 'settings' },
    { label: 'Hilfe', route: 'help' },
    { label: 'Über uns', route: 'about-us' },
    { label: 'Initiale Angular Seite', route: 'inital-angular-site' },
  ];
}
