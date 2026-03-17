import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../common/directives/has-permission.directive';
import { AppLanguage, RoutingObj } from '../../common/types';
import { AuthApiService } from '../../core/auth/auth-api.service';
import { APP_PERMISSIONS } from '../../core/auth/permissions.model';
import { LANGUAGES } from '../../core/constants/languages.constant';
import { LanguageService } from '../../core/language.service';
import { UserChipComponent } from '../../user/user-chip/user-chip.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [UserChipComponent, RouterLink, TranslateModule, HasPermissionDirective, FaIconComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.less',
})
export class NavbarComponent {
    p = APP_PERMISSIONS;
    navItems: RoutingObj[] = [];
    currentLanguage?: AppLanguage;
    authApiService = inject(AuthApiService);

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

    protected onLogout(): void {
        this.authApiService.logout();
        
    }

    // fa-icons
    protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
}
