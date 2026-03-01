import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppLanguage, RoutingObj } from '../../common/types';
import { APP_PERMISSIONS } from '../../core/auth/permissions.model';
import { LANGUAGES } from '../../core/constants/languages.constant';
import { LanguageService } from '../../core/language.service';
import { UserChipComponent } from '../../user/user-chip/user-chip.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [UserChipComponent, RouterLink, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.less',
})
export class NavbarComponent {
    p = APP_PERMISSIONS;
    navItems: RoutingObj[] = [];
    currentLanguage?: AppLanguage;

    private readonly languageService = inject(LanguageService);
    readonly otherLanguages = computed(() => this.getOtherLanguages());
    readonly currentLangObj = computed(() => this.getLangObjByCode());

    onSwitchLang(langCode: string): void {
        this.languageService.changeAndSetPreference(langCode);
    }

    private getLangObjByCode(): AppLanguage {
        const langCode = this.getCurrentLangCode();
        const found = LANGUAGES.find(obj => obj.code === langCode);
        return found || LANGUAGES.find(obj => obj.code === this.languageService.appDefaultLangCode)!;
    }

    private getCurrentLangCode(): string {
        return this.languageService.currentLang();
    }

    private getOtherLanguages(): AppLanguage[] {
        return LANGUAGES.filter(lang => lang.code != this.getCurrentLangCode());
    }
}
