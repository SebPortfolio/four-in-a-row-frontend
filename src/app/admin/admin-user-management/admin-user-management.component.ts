import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faHandFist, faInfinity, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { DialogService } from '../../common/dialog/dialog.service';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { UserStammdatenPanelComponent } from '../../user/user-stammdaten-panel/user-stammdaten-panel.component';
import { UserStatus } from '../../user/user.model';
import { UserAdmin } from '../admin.model';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-management',
    standalone: true,
    imports: [TranslateModule, SpinnerComponent, FaIconComponent, UserStammdatenPanelComponent],
    templateUrl: './admin-user-management.component.html',
    styleUrl: './admin-user-management.component.less',
})
export class AdminUserManagementComponent implements OnInit {
    isLoading = signal(false);
    user = signal<UserAdmin | undefined>(undefined);

    constructor(
        private route: ActivatedRoute,
        private userAdminApiService: UserAdminApiService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const idParam = params.get('userId');

            if (idParam) {
                this.loadUser(idParam);
            }
        });
    }

    private loadUser(id: number | string): void {
        if (typeof id === 'string') {
            id = Number(id);
        }
        this.isLoading.set(true);
        this.userAdminApiService
            .getUserById(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (res: UserAdmin) => {
                    res.lastPasswordChangeAt = '2026-01-28';
                    this.user.set(res);
                },
                error: err => {
                    console.error('Abruf des Users fehlgeschlagen: ', err);
                },
            });
    }

    isBannedTemporarly(): boolean {
        return this.user()?.status === UserStatus.Banned;
    }

    isBannedPermanently(): boolean {
        return this.user()?.status === UserStatus.PermanentBanned;
    }

    onEdit(): void {
        console.debug('Edit: ', this.user());
    }

    onBan(): void {
        console.debug('Ban: ', this.user());
    }

    onBanPermanent(): void {
        console.debug('Perma ban: ', this.user());
    }

    onUnban(): void {
        console.debug('Unban: ', this.user());
    }

    // Fa-Icons
    faEdit = faEdit;
    faHandFist = faHandFist;
    faInfinity = faInfinity;
    faUnlock = faUnlock;
}
