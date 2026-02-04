import { Injectable } from '@angular/core';
import { GameApi } from '../../../openapi';
import { Observable } from 'rxjs';
import { Game, GameCreateRequest, GameStatus, MoveRequest } from './game.model';

@Injectable({
    providedIn: 'root',
})
export class GameApiService {
    constructor(private gameApi: GameApi) {}

    getGames(gameStatus?: GameStatus): Observable<Game[]> {
        return this.gameApi.getGames(gameStatus);
    }

    getGameById(gameId: number): Observable<Game> {
        return this.gameApi.getGameById(gameId);
    }

    createGame(player1Id: number, player2Id: number): Observable<Game> {
        const gameCreateRequest: GameCreateRequest = {
            player1Id: player1Id,
            player2Id: player2Id,
        };
        return this.gameApi.createGame(gameCreateRequest);
    }

    makeMove(gameId: number, moveRequest: MoveRequest): Observable<Game> {
        return this.gameApi.makeMove(gameId, moveRequest);
    }

    deleteGame(gameId: number): Observable<Game> {
        return this.gameApi.deleteGameById(gameId);
    }
}
