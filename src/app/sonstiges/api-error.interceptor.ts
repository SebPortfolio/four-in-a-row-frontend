import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
                console.error('Ressource nicht gefunden: ', error);
            } else if (error.status === 500) {
                console.error('Serverfehler: ', error);
            }

            return throwError(() => error);
        })
    );
};
