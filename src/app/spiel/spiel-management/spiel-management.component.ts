import { Component, input, InputSignal, Signal } from '@angular/core';
import { GameMode } from '../../common/types';
import { GameApiService } from '../game-api.service';
import { catchError, of, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Game } from '../game.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpielBrettComponent } from '../spiel-brett/spiel-brett.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spiel-management',
    standalone: true,
    imports: [SpielBrettComponent, CommonModule],
    templateUrl: './spiel-management.component.html',
    styleUrl: './spiel-management.component.less',
})
export class SpielManagementComponent {
    constructor(private gameApiService: GameApiService, private router: Router) {}

    gameMode: InputSignal<GameMode> = input.required<GameMode>();
    gameId: InputSignal<number | null> = input<number | null>(null);

    // Wandelt gameId-Input (Signal) in Observable um, somit kann man auf Änderungen (z.B. ID-Wechsel in der URL) reagieren
    game: Signal<Game | undefined> = toSignal(
        toObservable(this.gameId).pipe(
            // Bricht laufende Requests ab, wenn neue ID kommt
            switchMap(gameId => {
                if (gameId !== null && gameId !== undefined) {
                    // FALL 1: ID vorhanden -> Spiel laden
                    return this.gameApiService.getGameById(gameId).pipe(
                        catchError(err => {
                            this.handleGameError(err);
                            return of({} as Game);
                        })
                    );
                } else {
                    // FALL 2: Keine ID -> Neues Spiel erstellen
                    return this.gameApiService.createGame(1, 2).pipe(
                        // TODO: korrekte Spieler-IDs verwenden
                        switchMap(newGame => {
                            this.router.navigate([this.gameMode(), 'games', newGame.id], { replaceUrl: true });
                            return of(newGame);
                        }),
                        catchError(err => {
                            this.handleGameError(err);
                            return of({} as Game);
                        })
                    );
                }
            })
        )
    );

    spielStarten(): void {}
    spielLaden(): void {}

    private handleGameError(error: HttpErrorResponse): void {
        console.error('Fehler beim Erstellen/Laden des Spiels:', error);
        switch (error.status) {
            case 404:
                alert('Spiel nicht gefunden.');
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
