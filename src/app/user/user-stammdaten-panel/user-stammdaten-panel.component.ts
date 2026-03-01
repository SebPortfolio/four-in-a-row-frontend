import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserAdmin } from '../../admin/admin.model';
import { PanelComponent } from '../../common/panel/panel.component';
import { AppDatePipe } from '../../common/pipes/app-date.pipe';
import { MaskEmailPipe } from '../../common/pipes/mask-email.pipe';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { User } from '../user.model';

@Component({
    selector: 'app-user-stammdaten-panel',
    standalone: true,
    imports: [TranslateModule, MaskEmailPipe, PanelComponent, SpinnerComponent, AppDatePipe],
    templateUrl: './user-stammdaten-panel.component.html',
    styleUrl: './user-stammdaten-panel.component.less',
})
export class UserStammdatenPanelComponent {
    isLoading = input.required<boolean>();
    user = input.required<User | UserAdmin | undefined>();
}
