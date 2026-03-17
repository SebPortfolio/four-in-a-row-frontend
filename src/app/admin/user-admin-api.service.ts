import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdministrationApi } from '../../../openapi';
import { UserAdminCreateRequest, UserAdminPatchRequest, UserAdminResponse, UserAudit } from './admin.model';

@Injectable({
    providedIn: 'root',
})
export class UserAdminApiService {
    constructor(private userAdminApi: UserAdministrationApi) {}

    getAllUsers(): Observable<UserAdminResponse[]> {
        return this.userAdminApi.getUsersAsAdmin();
    }

    getUserById(userId: number): Observable<UserAdminResponse> {
        return this.userAdminApi.getUserByIdAsAdmin(userId);
    }

    createUser(request: UserAdminCreateRequest): Observable<UserAdminResponse> {
        return this.userAdminApi.createUserAsAdmin(request);
    }

    patchUser(userId: number, request: UserAdminPatchRequest): Observable<UserAdminResponse> {
        return this.userAdminApi.patchUserAsAdmin(userId, request);
    }

    deleteUser(userId: number): Observable<void> {
        return this.userAdminApi.deleteUserAsAdmin(userId);
    }

    getAllRoles(): Observable<string[]> {
        return this.userAdminApi.getAllRoles();
    }

    getAllPermissions(): Observable<string[]> {
        return this.userAdminApi.getAllPermissions();
    }

    getUserHistory(userId: number): Observable<UserAudit[]> {
        return this.userAdminApi.getUserHistory(userId);
    }
}
