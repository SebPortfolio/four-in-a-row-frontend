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

    getFilteredGames(gameStatus?: GameStatus, gameMode?: GameMode, playerId?: number) {
        return this.gameApi.getAllGames(gameStatus, gameMode);
    }

    getGameById(gameId: number): Observable<Game> {
        //console.log('MOCKING: Fetching game with ID:', gameId);
        //return of(this.mockGame());
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

    private mockGame(): Game {
        return {
            id: 1,
            player1: {
                id: 0,
                username: 'Spieler 1',
                registeredOn: '2023-01-01T00:00:00Z',
            },
            player2: {
                id: 1,
                username: 'Spieler 2',
                registeredOn: '2024-12-01T00:00:00Z',
            },
            board: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 1, 2, 1, 0, 0, 0],
                [2, 1, 1, 2, 0, 0, 0],
            ],
            currentPlayerId: 1,
            status: GameStatus.InProgress,
            mode: GameMode.Singleplayer,
        };
    }
}
