import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private router: Router = inject(Router);

    public handlePlayerError(error: HttpErrorResponse): void {
        const errorPre = 'Player-Request fehlgeschlagen: ';
        console.error(errorPre, error);

        if (error.status === 404) {
            this.router.navigate(['/players']);
        }
    }
}
