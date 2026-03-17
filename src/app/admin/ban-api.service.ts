import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BanApi, BanAuditWdto } from '../../../openapi';
import {
    BanCreateRequest,
    BanPermanentCreateRequest,
    BanResponse,
    BanUpdateRequest,
    CancelBanRequest,
} from './admin.model';

@Injectable({
    providedIn: 'root',
})
export class BanApiService {
    private readonly banApi = inject(BanApi);

    banUserTemporarily(userId: number, request: BanCreateRequest): Observable<BanResponse> {
        return this.banApi.banUser(userId, request);
    }

    banUserPermanently(userId: number, request: BanPermanentCreateRequest): Observable<BanResponse> {
        return this.banApi.banUserPermanent(userId, request);
    }

    editBan(userId: number, banId: number, request: BanUpdateRequest): Observable<BanResponse> {
        return this.banApi.updateBan(userId, banId, request);
    }

    unbanUser(userId: number, banId: number, request: CancelBanRequest): Observable<BanResponse> {
        return this.banApi.cancelBan(userId, banId, request);
    }

    getBanHistory(userId: number, banId: number): Observable<BanAuditWdto[]> {
        return this.banApi.getBanHistory(userId, banId);
    }
}
