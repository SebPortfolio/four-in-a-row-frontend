import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MeService } from '../auth/me.service';

export const meGuard: CanActivateFn = route => {
    const meService = inject(MeService);
    const router = inject(Router);
    const playerId = meService.currentUser()?.playerId;

    if (playerId) {
        return router.createUrlTree(['/players', playerId]);
    }

    return router.createUrlTree(['/login']);
};
