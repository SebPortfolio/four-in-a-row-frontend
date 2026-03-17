import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { InterpolatableTranslationObject, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LANGUAGES } from './constants/languages.constant';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly localStorageVar = 'preferredLang';
    public readonly appDefaultLangCode = 'de';

    private readonly translateService = inject(TranslateService);
    private readonly platformId = inject(PLATFORM_ID);

    readonly currentLang = signal<string>(this.appDefaultLangCode);

    private readonly localeMap: Record<string, string> = {
        de: 'de-DE',
        en: 'en-US',
    };
    readonly localeId = computed(() => this.localeMap[this.currentLang()] || 'de-DE');

    public initLang(): Observable<InterpolatableTranslationObject> {
        const langCode = this.getPreferedLanguageCode();
        this.currentLang.set(langCode);
        return this.translateService.use(langCode);
    }

    public getPreferedLanguageCode(): string {
        if (isPlatformBrowser(this.platformId)) {
            const localLangCode = localStorage.getItem(this.localStorageVar);
            if (localLangCode) {
                return localLangCode;
            }
            const browserLangCode = this.translateService.getBrowserLang();
            if (this.isBrowserLangSupported(browserLangCode)) {
                return browserLangCode!;
            }

            console.warn(`keine Sprachpräferenz gesetzt, nutze '${this.appDefaultLangCode}'`);
            return this.appDefaultLangCode; // overall Default
        }
        console.info('System läuft nicht in Browser'); // sollte nicht auftreten, weil SSR nicht aktiv ist, maximal CI/CD
        return this.appDefaultLangCode;
    }

    private isBrowserLangSupported(browserLangCode?: string): boolean {
        if (!browserLangCode) {
            return false;
        }
        return LANGUAGES.some(lang => lang.code === browserLangCode);
    }

    private setPreferedLanguageCode(langCode: string): void {
        if (isPlatformBrowser(this.platformId)) {
            console.log(`Sprachpräferenz geändert: '${langCode}'`);
            localStorage.setItem(this.localStorageVar, langCode);
        } else {
            console.debug('Kein Browser, ergo kein localStorage. KEINE Erneuerung der Sprachpräferenz');
        }
    }

    public changeAndSetPreference(langCode: string): void {
        this.setPreferedLanguageCode(langCode);
        this.currentLang.set(langCode);

        this.translateService.use(langCode);
    }
}
