import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { AuthApi } from '../../../../openapi';
import { AuthUserResponse, LoginRequest, RegisterRequest } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    constructor(
        private authApi: AuthApi,
        private authService: AuthService,
        private destroyRef: DestroyRef
    ) {}

    register(registerRequest: RegisterRequest): Observable<AuthUserResponse> {
        return this.authApi.register(registerRequest).pipe(tap(res => this.authService.updateAuth(res)));
    }

    login(loginRequest: LoginRequest): Observable<AuthUserResponse> {
        return this.authApi.login(loginRequest).pipe(tap(res => this.authService.updateAuth(res)));
    }

    refresh(): Observable<AuthUserResponse> {
        return this.authApi.refreshAccessToken().pipe(tap(res => this.authService.updateAuth(res)));
    }

    /**
     * Logout ist ein Spezialfall: Er muss durchlaufen,
     * egal ob die Komponente noch existiert.
     */
    logout(): void {
        this.authApi
            .logout('')
            .pipe(
                // Sicherstellen, dass die Subscription sauber beendet wird,
                // falls die App entladen wird
                takeUntilDestroyed(this.destroyRef),
                // Egal ob Erfolg oder Fehler: Lokal aufräumen
                tap(() => this.authService.clearAuth()),
                catchError(() => {
                    this.authService.clearAuth();
                    return EMPTY;
                })
            )
            .subscribe();
    }

    checkAuth(): Observable<AuthUserResponse | null> {
        return this.authApi.refreshAccessToken().pipe(
            tap(res => this.authService.updateAuth(res)),
            catchError(() => {
                this.authService.clearAuth();
                return of(null);
            })
        );
    }
}
