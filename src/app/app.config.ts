import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BASE_PATH } from '../../openapi';
import { routes } from './app.routes';
import { apiErrorInterceptor } from './sonstiges/api-error.interceptor';
import { HttpLoaderFactory } from './sonstiges/translate-http-loader';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        { provide: BASE_PATH, useValue: 'http://localhost:8000' },
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
