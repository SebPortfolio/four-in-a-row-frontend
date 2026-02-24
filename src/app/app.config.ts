import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BASE_PATH } from '../../openapi';
import { routes } from './app.routes';
import { AuthApiService } from './core/auth/auth-api.service';
import { initializeApp } from './core/initalizers/app.initializer';
import { HttpLoaderFactory } from './core/initalizers/translate-http-loader';
import { apiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(
            withInterceptors([apiErrorInterceptor, authInterceptor]),
            withXsrfConfiguration({
                cookieName: 'XSRF-TOKEN', // Name des Cookies vom Spring-Server
                headerName: 'X-XSRF-TOKEN', // Name des Headers, den Spring erwartet
            })
        ),
        { provide: BASE_PATH, useValue: 'http://localhost:8000' },
        { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthApiService], multi: true },
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
                defaultLanguage: 'de',
            })
        ),
    ],
};
