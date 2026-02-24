import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    console.warn('AuthGuard: No user found, redirecting to login');
    return of(router.createUrlTree(['/login'])).pipe(delay(0));
};
