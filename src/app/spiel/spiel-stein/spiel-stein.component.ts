import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal } from '@angular/core';

@Component({
    selector: 'app-spiel-stein',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './spiel-stein.component.html',
    styleUrl: './spiel-stein.component.less',
})
export class SpielSteinComponent {
    player: InputSignal<number> = input.required<number>();
    isGhost: InputSignal<boolean> = input<boolean>(false);
    currentPlayer: InputSignal<number> = input.required<number>();

    stoneClass = computed(() => {
        const p = this.isGhost() ? this.currentPlayer() : this.player();
        if (p === 0 && !this.isGhost()) return '';
        return p === 1 ? 'blau' : 'rot';
    });
}
