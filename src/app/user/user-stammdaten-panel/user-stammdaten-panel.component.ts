import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, switchMap, take, tap, timer } from 'rxjs';
import { UserAdminMasterDataResponse } from '../../admin/admin.model';
import { UserAdminApiService } from '../../admin/user-admin-api.service';
import { LastModifiedInfoComponent } from '../../common/last-modified-info/last-modified-info.component';
import { PanelComponent } from '../../common/panel/panel.component';
import { AppDatePipe } from '../../common/pipes/app-date.pipe';
import { SpinnerComponent } from '../../common/spinner/spinner.component';

@Component({
    selector: 'app-user-stammdaten-panel',
    standalone: true,
    imports: [
        TranslateModule,
        PanelComponent,
        SpinnerComponent,
        AppDatePipe,
        FaIconComponent,
        LastModifiedInfoComponent,
    ],
    templateUrl: './user-stammdaten-panel.component.html',
    styleUrl: './user-stammdaten-panel.component.less',
})
export class UserStammdatenPanelComponent implements OnInit {
    userAdminApiService = inject(UserAdminApiService);

    isLoading = signal<boolean>(true);
    userId = input.required<number>();
    user = signal<UserAdminMasterDataResponse | undefined>(undefined);
    protected clearEmail = signal<string | undefined>(undefined);
    protected secondsLeft = signal<number>(0);

    ngOnInit(): void {
        this.loadMasterData();
    }

    private loadMasterData(): void {
        this.userAdminApiService
            .getUserMasterData(this.userId())
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: res => {
                    this.user.set(res);
                },
            });
    }

    protected onRevealEmail(): void {
        this.userAdminApiService
            .getRevealedEmail(this.userId())
            .pipe(
                tap(res => {
                    this.clearEmail.set(res.email);
                    this.secondsLeft.set(30);
                }),
                switchMap(() =>
                    timer(0, 1000).pipe(
                        take(31), // 0 bis 30
                        tap(val => this.secondsLeft.set(30 - val)),
                        finalize(() => {
                            this.clearEmail.set(undefined);
                            this.secondsLeft.set(0);
                        })
                    )
                )
            )
            .subscribe({
                error: () => {
                    console.warn('Fehler beim anzeigen der Klartext Mail');
                },
            });
    }

    // fa-icons
    faEye = faEye;
}
