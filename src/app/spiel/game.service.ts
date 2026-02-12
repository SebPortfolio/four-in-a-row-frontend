import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../player/player.model';
import { Game } from './game.model';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(private router: Router) {}

    public getCurrentPlayer(game: Game): Player {
        return game.player1.id === game.currentPlayerId ? game.player1 : game.player2;
    }

    public handleGameApiError(error: HttpErrorResponse): void {
        const errorPre = 'Game-Request fehlgeschlagen: ';
        console.error(errorPre, error);

        if (error.status === 404) {
            // zur Menu-Seite des GameMode?
        }
    }
}
