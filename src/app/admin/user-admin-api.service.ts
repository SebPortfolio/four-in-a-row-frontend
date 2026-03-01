import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdministrationApi } from '../../../openapi';
import {
    BanPermanentRequest,
    BanRequest,
    UnbanRequest,
    UserAdmin,
    UserAdminCreateRequest,
    UserAdminUpdateRequest,
} from './admin.model';

@Injectable({
    providedIn: 'root',
})
export class UserAdminApiService {
    constructor(private userAdminApi: UserAdministrationApi) {}

    getAllUsers(): Observable<UserAdmin[]> {
        return this.userAdminApi.getUsersAsAdmin();
    }

    getUserById(userId: number): Observable<UserAdmin> {
        return this.userAdminApi.getUserByIdAsAdmin(userId);
    }

    createUser(request: UserAdminCreateRequest): Observable<UserAdmin> {
        return this.userAdminApi.createUserAsAdmin(request);
    }

    patchUser(userId: number, request: UserAdminUpdateRequest): Observable<UserAdmin> {
        return this.userAdminApi.updateUserAsAdmin(userId, request);
    }

    deleteUser(userId: number): Observable<void> {
        return this.userAdminApi.deleteUserAsAdmin(userId);
    }

    banUserTemporarily(userId: number, request: BanRequest): Observable<UserAdmin> {
        return this.userAdminApi.banUser(userId, request);
    }

    banUserPermanent(userId: number, request: BanPermanentRequest): Observable<UserAdmin> {
        return this.userAdminApi.banUserPermanent(userId, request);
    }

    unbanUser(userid: number, request: UnbanRequest): Observable<UserAdmin> {
        return this.userAdminApi.unbanUser(userid, request);
    }
}
