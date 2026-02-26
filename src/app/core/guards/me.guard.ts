import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const meGuard: CanActivateFn = route => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userId = authService.currentUser()?.userId;

    if (userId) {
        return router.createUrlTree(['/players', userId]);
    }

    return router.createUrlTree(['/login']);
};
