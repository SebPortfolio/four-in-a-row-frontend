import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameApi } from '../../../openapi';
import { Game, GameCreateRequest, GameMode, GameStatus, MoveRequest } from './game.model';

@Injectable({
    providedIn: 'root',
})
export class GameApiService {
    constructor(private gameApi: GameApi) {}

    getAllGames(): Observable<Game[]> {
        return this.gameApi.getAllGames();
    }

    getFilteredGames(gameStatus?: GameStatus, gameMode?: GameMode, playerId?: number): Observable<Game[]> {
        return this.gameApi.getAllGames(gameStatus, gameMode, playerId);
    }

    getGameById(gameId: number): Observable<Game> {
        return this.gameApi.getGameById(gameId);
    }

    createGame(player1Id: number, player2Id: number, gameMode: GameMode): Observable<Game> {
        const gameCreateRequest: GameCreateRequest = {
            player1Id: player1Id,
            player2Id: player2Id,
            gameMode: gameMode,
        };
        return this.gameApi.createGame(gameCreateRequest);
    }

    makeMove(gameId: number, moveRequest: MoveRequest): Observable<Game> {
        console.log('Making move for game ID:', gameId, 'with request:', moveRequest);
        return this.gameApi.makeMove(gameId, moveRequest);
    }

    deleteGame(gameId: number): Observable<Game> {
        return this.gameApi.deleteGame(gameId);
    }
}
