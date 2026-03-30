import { Component, inject, input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MeService } from '../../core/auth/me.service';
import { LastModifiedExtendedInfos, LastModifiedInfos } from '../audit.model';
import { AppDatePipe } from '../pipes/app-date.pipe';

@Component({
    selector: 'app-last-modified-info',
    standalone: true,
    imports: [TranslateModule, AppDatePipe],
    templateUrl: './last-modified-info.component.html',
    styleUrl: './last-modified-info.component.less',
})
export class LastModifiedInfoComponent {
    infos = input.required<LastModifiedInfos | LastModifiedExtendedInfos>();

    meService = inject(MeService);
    translateService = inject(TranslateService);

    protected getModifierName(): string {
        const data = this.infos();

        if (data.lastModifiedByUserId == this.meService.currentUser()?.id) {
            return this.translateService.instant('ALLGEMEIN.DIR');
        }
        if ('lastModifiedByUserDisplayName' in data && data.lastModifiedByUserDisplayName) {
            return data.lastModifiedByUserDisplayName as string;
        }

        return `User_${data.lastModifiedByUserId}`;
    }
}
