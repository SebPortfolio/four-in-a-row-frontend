import { Component, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { DatatableComponent, TableColumn, TableConfig } from '../../common/datatable/datatable.component';
import { MaskEmailPipe } from '../../common/pipes/mask-email.pipe';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { UserStatus } from '../../user/user.model';
import { UserAdmin } from '../admin.model';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-overview',
    standalone: true,
    imports: [DatatableComponent, SpinnerComponent],
    providers: [MaskEmailPipe],
    templateUrl: './admin-user-overview.component.html',
    styleUrl: './admin-user-overview.component.less',
})
export class AdminUserOverviewComponent implements OnInit {
    users?: UserAdmin[] = [];
    config?: TableConfig;
    isLoading = signal<boolean>(true);

    constructor(
        private userAdminApiService: UserAdminApiService,
        private translateService: TranslateService,
        private maskEmailPipe: MaskEmailPipe
    ) {}

    ngOnInit(): void {
        this.initTableConfig();
        this.loadAllUsers();
    }

    private loadAllUsers(): void {
        this.userAdminApiService
            .getAllUsers()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: res => {
                    this.users = [...res];
                },
                error: err => {
                    console.error('Abfrage aller User fehlgeschlagen: ', err);
                },
            });
    }

    private initTableConfig(): void {
        this.config = {
            title: 'User Verwaltung',
            columns: this.getTableColums(),
        };
    }

    private getTableColums(): TableColumn[] {
        return [
            {
                name: 'ADMIN_USER_OVERVIEW.ANZEIGENAME',
                prop: 'displayName',
                href: (row: UserAdmin) => `/administration/users/${row.id}`,
                minWidth: 100,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.EMAIL',
                prop: 'email',
                minWidth: 100,
                transform: (email: string): string => {
                    return this.maskEmailPipe.transform(email);
                },
            },
            {
                name: 'ADMIN_USER_OVERVIEW.STATUS',
                prop: 'status',
                transform: (status: UserStatus): string => {
                    return this.translateService.instant(`USER.STATUS.${status}`);
                },
                minWidth: 70,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.ROLLEN',
                prop: 'roles',
                noDataStr: '-',
                minWidth: 80,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.HAT_SONDERBERECHTIGUNGEN',
                prop: 'customPermissions',
                transform: (customPermissions: PermissionName[]): string => {
                    const boolenString: string = !customPermissions || customPermissions.length === 0 ? 'NEIN' : 'JA';
                    return this.translateService.instant('ALLGEMEIN.' + boolenString);
                },
                minWidth: 220,
            },
        ];
    }
}
