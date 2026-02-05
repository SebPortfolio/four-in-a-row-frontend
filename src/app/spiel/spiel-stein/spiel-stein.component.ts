import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'app-spiel-stein',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './spiel-stein.component.html',
    styleUrl: './spiel-stein.component.less',
})
export class SpielSteinComponent {
    player: InputSignal<number> = input.required<number>();
}
