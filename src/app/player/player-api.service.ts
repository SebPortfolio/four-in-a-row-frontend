import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerApi } from '../../../openapi';
import { Player, PlayerCreateRequest } from './player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayerApiService {
    constructor(private playerApi: PlayerApi) {}

    public getAllPlayers(): Observable<Player[]> {
        return this.playerApi.getAllPlayers();
    }

    public getPlayerById(playerId: number): Observable<Player> {
        return this.playerApi.getPlayerById(playerId);
    }

    public createPlayer(createPlayerRequest: PlayerCreateRequest): Observable<Player> {
        return this.playerApi.createPlayer(createPlayerRequest);
    }

    public updatePlayer(player: Player): Observable<Player> {
        return this.playerApi.updatePlayer(player.id, player);
    }

    public deletePlayer(playerId: number): Observable<unknown> {
        return this.playerApi.deletePlayer(playerId);
    }
}
