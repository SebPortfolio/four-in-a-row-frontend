import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.currentAccessToken();

    const getXsrfToken = (): string | null => {
        const name = 'XSRF-TOKEN=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return null;
    };

    const xsrfToken = getXsrfToken();

    let headers = req.headers;
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (xsrfToken) {
        headers = headers.set('X-XSRF-TOKEN', xsrfToken);
    }

    const clonedReq = req.clone({
        headers,
        withCredentials: true,
    });

    return next(clonedReq);
};
