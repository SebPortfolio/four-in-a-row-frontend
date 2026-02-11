import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BASE_PATH } from '../../openapi';
import { routes } from './app.routes';
import { apiErrorInterceptor } from './sonstiges/api-error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        { provide: BASE_PATH, useValue: 'http://localhost:8000' },
    ],
};
