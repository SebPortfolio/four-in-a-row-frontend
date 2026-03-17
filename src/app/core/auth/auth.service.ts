import { computed, Injectable, signal } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthResponse } from './auth.model';
import { AppPermission } from './permissions.model';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _currentAccessToken = signal<string | null>(null);

    readonly currentAccessToken = this._currentAccessToken.asReadonly();

    readonly userContext = computed(() => {
        return this.decodeSafe();
    });

    readonly isAuthenticated = computed(() => {
        const token = this._currentAccessToken();
        if (!token) {
            return false;
        }
        const decoded = this.decodeSafe();
        return decoded ? !this.isTokenExpired(decoded) : false;
    });

    public updateAuth(res: AuthResponse): void {
        this._currentAccessToken.set(res.accessToken);
    }

    public clearAuth(): void {
        this._currentAccessToken.set(null);
    }

    public hasAnyPermission(permissions: AppPermission[]): boolean {
        if (!this.isAuthenticated()) {
            return false;
        }

        const userContext = this.userContext();

        if (!userContext?.authorities) {
            return false;
        }

        const userPerms = userContext.authorities;
        return permissions.some(perm => userPerms.includes(perm));
    }

    private decodeSafe(): UserContext | null {
        const token = this._currentAccessToken();
        if (!token) {
            console.warn('Kein Access-Token');
            return null;
        }
        try {
            const decoded = jwtDecode<UserContext>(token);
            // console.debug('Gültiges JWT: ', decoded);
            return decoded;
        } catch (error) {
            console.error('Fehler beim Decodieren des JWT:', error);
            return null;
        }
    }

    /**
     * Prüft, ob das Token basierend auf dem 'exp' Claim abgelaufen ist.
     */
    private isTokenExpired(payload: JwtPayload): boolean {
        if (!payload.exp) {
            return false;
        }

        // Date.now() liefert Millisekunden, exp sind Sekunden
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    }
}

interface UserContext extends JwtPayload {
    userId?: number;
    playerId?: number;
    authorities?: string[];
}
