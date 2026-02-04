import { Component, input, InputSignal, Signal } from '@angular/core';
import { GameMode } from '../../common/types';
import { GameApiService } from '../game-api.service';
import { catchError, of, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Game } from '../game.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-game-board',
    standalone: true,
    imports: [],
    templateUrl: './game-board.component.html',
    styleUrl: './game-board.component.less',
})
export class GameBoardComponent {
    constructor(private gameApiService: GameApiService, private router: Router) {}

    gameMode: InputSignal<GameMode> = input.required<GameMode>();
    gameId: InputSignal<number> = input.required<number>();

    // Wandelt gameId-Input (Signal) in Observable um, somit kann man auf Änderungen (z.B. ID-Wechsel in der URL) reagieren
    game: Signal<Game> = toSignal(
        toObservable(this.gameId).pipe(
            // Bricht laufende Requests ab, wenn neue ID kommt
            switchMap(gameId =>
                this.gameApiService.getGameById(gameId).pipe(
                    catchError(err => {
                        this.handleGameError(err);
                        return of({} as Game);
                    })
                )
            )
        ),
        // Verhindert 'undefined' als Initialwert.
        { initialValue: {} as Game }
    );

    private handleGameError(error: HttpErrorResponse): void {
        console.error('Fehler beim Laden des Spiels:', error);
        switch (error.status) {
            case 404:
                alert('Spiel nicht gefunden. Bitte überprüfen Sie die Spiel-ID.');
                break;
            case 500:
                alert('Serverfehler. Bitte versuchen Sie es später erneut.');
                break;
            default:
                alert('Ein unbekannter Fehler ist aufgetreten.');
        }

        this.router.navigate(['/singleplayer']);
    }
}
