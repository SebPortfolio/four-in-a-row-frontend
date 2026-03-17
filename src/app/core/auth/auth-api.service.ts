import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { AuthApi } from '../../../../openapi';
import { MyProfile } from '../../user/user.model';
import { AuthResponse, LoginRequest, RegisterRequest } from './auth.model';
import { AuthService } from './auth.service';
import { MeService } from './me.service';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    constructor(
        private authApi: AuthApi,
        private authService: AuthService,
        private destroyRef: DestroyRef,
        private router: Router,
        private meService: MeService
    ) {}

    register(registerRequest: RegisterRequest): Observable<AuthResponse> {
        return this.authApi.register(registerRequest).pipe(tap(res => this.authService.updateAuth(res)));
    }

    login(loginRequest: LoginRequest): Observable<MyProfile> {
        return this.authApi.login(loginRequest).pipe(
            tap(res => this.authService.updateAuth(res)),
            switchMap(() => this.getMe()),
            tap(user => this.meService.setUser(user))
        );
    }

    refresh(): Observable<AuthResponse> {
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
                tap(() => {
                    this.authService.clearAuth();
                    this.meService.resetUser();
                }),
                catchError(() => {
                    this.authService.clearAuth();
                    this.meService.resetUser();
                    return EMPTY;
                })
            )
            .subscribe();
        this.router.navigate(['/login']);
    }

    getMe(): Observable<MyProfile> {
        return this.authApi.me();
    }

    checkAuth(): Observable<MyProfile | null> {
        return this.refresh().pipe(
            switchMap(() => this.getMe()),
            tap((user: MyProfile) => {
                this.meService.setUser(user);
            }),
            catchError(() => {
                this.logout();
                return of(null);
            })
        );
    }
}
