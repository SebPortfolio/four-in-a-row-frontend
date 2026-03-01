import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApi } from '../../../openapi';
import { User, UserUpdateRequest } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    private readonly userApi = inject(UserApi);

    public getAllUsers(): Observable<User[]> {
        return this.userApi.getUsers();
    }

    public getUserById(userId: number): Observable<User> {
        return this.userApi.getUserById(userId);
    }

    public updateUser(userId: number, updateRequest: UserUpdateRequest): Observable<User> {
        return this.userApi.updateUser(userId, updateRequest);
    }
}
