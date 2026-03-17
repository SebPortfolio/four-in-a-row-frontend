import { InterpolatableTranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MyProfile } from '../../user/user.model';
import { AuthApiService } from '../auth/auth-api.service';
import { LanguageService } from '../language.service';

export function initializeApp(authService: AuthApiService): () => Observable<MyProfile | null> {
    return () => authService.checkAuth();
}

export function initializeLanguage(
    languageService: LanguageService
): () => Observable<InterpolatableTranslationObject> {
    return () => {
        return languageService.initLang();
    };
}
