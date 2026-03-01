import { InterpolatableTranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthApiService } from '../auth/auth-api.service';
import { LanguageService } from '../language.service';

export function initializeApp(authService: AuthApiService) {
    return () => authService.checkAuth();
}

export function initializeLanguage(
    languageService: LanguageService
): () => Observable<InterpolatableTranslationObject> {
    return () => {
        return languageService.initLang();
    };
}
