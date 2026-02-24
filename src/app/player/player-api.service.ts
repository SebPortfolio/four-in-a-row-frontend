import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerApi } from '../../../openapi';
import { Player } from './player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayerApiService {
    constructor(private playerApi: PlayerApi) {}

    public getAllPlayers(): Observable<Player[]> {
        return this.playerApi.getAllPlayers();
    }

    public getFilteredPlayers(searchTerm: string, limit?: number): Observable<Player[]> {
        return this.playerApi.getAllPlayers(searchTerm, limit);
    }

    public getPlayerById(playerId: number): Observable<Player> {
        return this.playerApi.getPlayerById(playerId);
    }

    public updatePlayer(player: Player): Observable<Player> {
        return this.playerApi.updatePlayer(player.id, player);
    }
}
