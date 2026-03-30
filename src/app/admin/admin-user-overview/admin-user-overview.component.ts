import { Component, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { DatatableComponent, TableColumn, TableConfig } from '../../common/datatable/datatable.component';
import { DialogService } from '../../common/dialog/dialog.service';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { UserStatus } from '../../user/user.model';
import { AdminUserCreateDialogComponent } from '../admin-user-create-dialog/admin-user-create-dialog.component';
import { UserAdminOverviewResponse } from '../admin.model';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-overview',
    standalone: true,
    imports: [DatatableComponent, SpinnerComponent],
    providers: [],
    templateUrl: './admin-user-overview.component.html',
    styleUrl: './admin-user-overview.component.less',
})
export class AdminUserOverviewComponent implements OnInit {
    users?: UserAdminOverviewResponse[] = [];
    config?: TableConfig;
    isLoading = signal<boolean>(true);

    constructor(
        private userAdminApiService: UserAdminApiService,
        private translateService: TranslateService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.initTableConfig();
        this.loadAllUsers();
    }

    protected onCreateUser(): void {
        this.dialogService
            .open({
                title: 'ADMIN_USER_CREATE_DIALOG.TITEL',
                component: AdminUserCreateDialogComponent,
            })
            .subscribe({
                next: res => {
                    console.log('onCreateUser abgeschlossen: ', res);
                },
                error: err => {
                    console.warn('onCreateUser fehlerhaft: ', err);
                },
            });
    }

    private loadAllUsers(): void {
        this.userAdminApiService
            .getUserOverview()
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
                name: 'ADMIN_USER_OVERVIEW.BENUTZERNAME',
                prop: 'displayName',
                href: (row: UserAdminOverviewResponse) => `/administration/users/${row.id}`,
                minWidth: 100,
                width: 100,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.EMAIL',
                prop: 'maskedEmail',
                minWidth: 80,
                width: 100,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.STATUS',
                prop: 'status',
                transform: (status: UserStatus): string => {
                    return this.translateService.instant(`USER.STATUS.${status}`);
                },
                minWidth: 70,
                width: 100,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.ROLLEN',
                prop: 'roles',
                noDataStr: '-',
                minWidth: 80,
                width: 140,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.HAT_SONDERBERECHTIGUNGEN',
                prop: 'hasCustomPermissions',
                type: 'boolean',
                minWidth: 220,
                width: 300,
            },
            {
                name: 'ADMIN_USER_OVERVIEW.IST_GEBANNT',
                prop: 'isBanned',
                type: 'boolean',
                minWidth: 100,
                width: 100,
            },
        ];
    }
}
