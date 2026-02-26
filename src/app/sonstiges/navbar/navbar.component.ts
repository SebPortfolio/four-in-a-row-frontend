import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RoutingObj } from '../../common/types';
import { APP_PERMISSIONS } from '../../core/auth/permissions.model';
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
}
