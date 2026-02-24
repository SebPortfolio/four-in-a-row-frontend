import { computed, Injectable, signal } from '@angular/core';
import { AuthUserResponse, UserContext } from './auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _currentUser = signal<UserContext | null>(null);
    private readonly _currentAccessToken = signal<string | null>(null);

    readonly currentUser = this._currentUser.asReadonly();
    readonly currentAccessToken = this._currentAccessToken.asReadonly();

    readonly isAuthenticated = computed(() => !!this.currentUser());

    constructor() {}

    public updateAuth(res: AuthUserResponse): void {
        this._currentAccessToken.set(res.accessToken);
        this._currentUser.set(res.userContext);
    }

    public clearAuth(): void {
        this._currentAccessToken.set(null);
        this._currentUser.set(null);
    }
}
