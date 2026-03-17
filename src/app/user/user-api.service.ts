import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApi } from '../../../openapi';
import { UserPatchRequest, UserResponse } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private readonly userApi = inject(UserApi);

    public patchUser(userId: number, patchRequest: UserPatchRequest): Observable<UserResponse> {
        return this.userApi.patchUser(userId, patchRequest);
    }

    public deleteById(userId: number): Observable<void> {
        return this.userApi.deleteUser(userId);
    }
}
