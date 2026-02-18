import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu-template',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './menu-template.component.html',
    styleUrl: './menu-template.component.less',
})
export class MenuTemplateComponent {
    @Input() titel: string = '';
    @Input() menuPoints: { label: string; route: string }[] = [];
}
