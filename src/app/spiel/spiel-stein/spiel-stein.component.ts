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
    /**
     * Spieler, dem der Spielstein gehört
     */
    playerId: InputSignal<number> = input.required<number>();
    isGhost: InputSignal<boolean> = input<boolean>(false);
    /**
     * aktueller Spieler, unabhängig der Zugehörigkeit
     */
    currentPlayerId: InputSignal<number> = input.required<number>();

    stoneClass = computed(() => {
        const p = this.isGhost() ? this.currentPlayerId() : this.playerId();
        if (p === 0 && !this.isGhost()) return '';
        return p === 1 ? 'blau' : 'rot';
    });
}
