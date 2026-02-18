import { Component, input, InputSignal, OnInit, output, signal, WritableSignal } from '@angular/core';
import { GameApiService } from '../game-api.service';
import { Game, GameStatus } from '../game.model';
import { GameService } from '../game.service';
import { SpielSteinComponent } from '../spiel-stein/spiel-stein.component';

@Component({
    selector: 'app-spiel-brett',
    standalone: true,
    imports: [SpielSteinComponent],
    templateUrl: './spiel-brett.component.html',
    styleUrl: './spiel-brett.component.less',
})
export class SpielBrettComponent implements OnInit {
    gameInput: InputSignal<Game> = input.required<Game>();
    game: WritableSignal<Game | null> = signal<Game | null>(null);

    gameCompleted = output<Game>();

    constructor(
        private gameService: GameService,
        private gameApiService: GameApiService
    ) {}

    ngOnInit(): void {
        console.log('SpielBrettComponent initialized with game:', this.gameInput());
        this.game.set(this.gameInput());
        if (this.game() && this.game()?.status === GameStatus.Completed) {
            this.gameCompleted.emit(this.game()!);
        }
    }

    hoveredColumn: WritableSignal<number | null> = signal<number | null>(null);
    selectedColumn: WritableSignal<number | null> = signal<number | null>(null);

    getLandingRow(column: number): number {
        const board = (this.game() || this.gameInput()).board;
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][column] === 0) {
                return row;
            }
        }
        throw new Error('Spalte ist voll');
    }

    handleCellClick(column: number): void {
        if (this.game()?.status === GameStatus.Completed) {
            console.log('Spiel abgeschlossen');
        } else if (this.selectedColumn() === column) {
            this.dropPiece(column);
            this.selectedColumn.set(null);
        } else {
            this.selectedColumn.set(column);
        }
    }

    protected isGhost(col: number, colIndex: number, rowIndex: number): boolean {
        return (
            this.movePossible() &&
            col === 0 &&
            (this.hoveredColumn() === colIndex || this.selectedColumn() === colIndex) &&
            this.getLandingRow(colIndex) === rowIndex
        );
    }

    protected movePossible(): boolean {
        return this.game()?.status === GameStatus.InProgress;
    }

    dropPiece(column: number): void {
        const row = this.getLandingRow(column);
        console.log(`Stein in Spalte ${column} auf Reihe ${row} fallen lassen.`);
        const currentGame = this.game() || this.gameInput();
        this.gameApiService
            .makeMove(currentGame.id, {
                column: column,
                playerId: currentGame.currentPlayerId,
            })
            .subscribe({
                next: updatedGame => {
                    console.log('Move successful:', updatedGame);
                    this.game.set({ ...updatedGame });
                },
                error: err => {
                    console.error('Error making move: ', err);
                    this.gameService.handleGameApiError(err);
                },
            });
    }
}
