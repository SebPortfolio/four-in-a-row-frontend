import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { GameModeUrl } from '../../common/types';
import { GameApiService } from '../game-api.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { SpielBrettComponent } from '../spiel-brett/spiel-brett.component';

@Component({
    selector: 'app-spiel-management',
    standalone: true,
    imports: [SpielBrettComponent, CommonModule],
    templateUrl: './spiel-management.component.html',
    styleUrl: './spiel-management.component.less',
})
export class SpielManagementComponent {
    constructor(private gameApiService: GameApiService, private gameService: GameService, private router: Router) {}

    gameMode: InputSignal<GameModeUrl> = input.required<GameModeUrl>();
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
                            this.gameService.handleGameApiError(err);
                            return of({} as Game);
                        })
                    );
                } else {
                    // FALL 2: Keine ID -> Neues Spiel erstellen
                    console.warn('kein Spiel mit dieser ID existiert, weiterleiten zur Spielerstellung');
                    this.router.navigate([this.gameMode(), 'games', 'new']);
                    return of({} as Game);
                }
            })
        )
    );
}
