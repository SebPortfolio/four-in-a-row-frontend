import { Component, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { Game } from '../game.model';
import { CommonModule } from '@angular/common';
import { SpielSteinComponent } from '../spiel-stein/spiel-stein.component';
import { GameApiService } from '../game-api.service';

@Component({
    selector: 'app-spiel-brett',
    standalone: true,
    imports: [CommonModule, SpielSteinComponent],
    templateUrl: './spiel-brett.component.html',
    styleUrl: './spiel-brett.component.less',
})
export class SpielBrettComponent implements OnInit {
    game: InputSignal<Game> = input.required<Game>();
    gameState: WritableSignal<Game | null> = signal<Game | null>(null);

    constructor(private gameApiService: GameApiService) {}

    ngOnInit(): void {
        console.log('SpielBrettComponent initialized with game:', this.game());
        this.gameState.set(this.game());
    }

    hoveredColumn: WritableSignal<number | null> = signal<number | null>(null);
    selectedColumn: WritableSignal<number | null> = signal<number | null>(null);

    getLandingRow(column: number): number {
        const board = (this.gameState() || this.game()).board;
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][column] === 0) {
                return row;
            }
        }
        throw new Error('Spalte ist voll');
    }

    handleCellClick(column: number): void {
        if (this.selectedColumn() === column) {
            this.dropPiece(column);
            this.selectedColumn.set(null);
        } else {
            this.selectedColumn.set(column);
        }
    }

    dropPiece(column: number): void {
        const row = this.getLandingRow(column);
        console.log(`Stein in Spalte ${column} auf Reihe ${row} fallen lassen.`);
        const currentGame = this.gameState() || this.game();
        this.gameApiService
            .makeMove(currentGame.id, {
                column: column,
                playerId: currentGame.currentPlayerId,
            })
            .subscribe({
                next: updatedGame => {
                    console.log('Move successful:', updatedGame);
                    this.gameState.set(updatedGame);
                },
                error: error => {
                    console.error('Error making move:', error);
                },
            });
    }
}
