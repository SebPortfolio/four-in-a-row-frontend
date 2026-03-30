import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LastModifiedInfoComponent } from '../../common/last-modified-info/last-modified-info.component';
import { PanelComponent } from '../../common/panel/panel.component';
import { AppDatePipe } from '../../common/pipes/app-date.pipe';
import { MaskEmailPipe } from '../../common/pipes/mask-email.pipe';
import { SpinnerComponent } from '../../common/spinner/spinner.component';

@Component({
    selector: 'app-user-stammdaten-panel',
    standalone: true,
    imports: [
        TranslateModule,
        PanelComponent,
        SpinnerComponent,
        AppDatePipe,
        LastModifiedInfoComponent,
    ],
    templateUrl: './user-stammdaten-panel.component.html',
    styleUrl: './user-stammdaten-panel.component.less',
})
export class UserStammdatenPanelComponent {
    isLoading = input.required<boolean>();
    user = input.required<UserAdminResponse | undefined>();
}
