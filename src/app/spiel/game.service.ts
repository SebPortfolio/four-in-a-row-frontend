import { Injectable } from '@angular/core';
import { Player } from '../player/player.model';
import { Game } from './game.model';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor() {}

    public getCurrentPlayer(game: Game): Player {
        return game.player1.id === game.currentPlayerId ? game.player1 : game.player2;
    }
}
