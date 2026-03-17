import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerAdministrationApi } from '../../../openapi';
import { PlayerPatchRequest } from './admin.model';

@Injectable({
    providedIn: 'root',
})
export class PlayerAdminApiService {
    playerAdminApi = inject(PlayerAdministrationApi);

    patchPlayer(playerId: number, patchRequest: PlayerPatchRequest): Observable<void> {
        return this.playerAdminApi.patchPlayerAsAdmin(playerId, patchRequest);
    }
}
