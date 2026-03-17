import { Component, input, model, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, forkJoin, Observable, of } from 'rxjs';
import { FormService } from '../../common/form.service';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { displayNameFormatValidator } from '../../common/validators/displayNameFormat.validator';
import { PlayerPatchRequest, UserAdminPatchRequest, UserAdminResponse } from '../admin.model';
import { PlayerAdminApiService } from '../player-admin-api.service';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-edit',
    standalone: true,
    imports: [ReactiveFormsModule, NgbTooltip, FaIconComponent, NgSelectComponent, SpinnerComponent, TranslateModule],
    templateUrl: './admin-user-edit.component.html',
    styleUrl: './admin-user-edit.component.less',
})
export class AdminUserEditComponent implements OnInit {
    userData = input.required<UserAdminResponse>();
    userForm?: FormGroup;
    givenRoles = input<Observable<string[]> | undefined>();
    givenPermissions = input<Observable<string[]> | undefined>();

    protected roles = signal<string[]>([]);
    protected permissions = signal<string[]>([]);

    protected isLoading = signal<boolean>(false);
    show = model<boolean>(false);

    userChange = output<UserAdminResponse>();

    constructor(
        private fb: FormBuilder,
        private userAdminApiService: UserAdminApiService,
        private playerAdminApiService: PlayerAdminApiService,
        private formService: FormService
    ) {}

    ngOnInit(): void {
        this.initRoles();
        this.initPermissions();
        this.initForm();
    }

    private initForm(): void {
        const user = this.userData();
        this.userForm = this.fb.group({
            displayName: this.fb.control(user.displayName, {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3), displayNameFormatValidator()],
            }),
            email: this.fb.control(user.email, {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            roles: this.fb.control(user.roles),
            customPermissions: this.fb.control(user.customPermissions),
        });
    }

    private initRoles(): void {
        if (!this.givenRoles()) {
            this.loadRoles();
        } else {
            this.givenRoles()?.subscribe(data => {
                this.roles.set(data);
            });
        }
    }

    private initPermissions(): void {
        if (!this.givenPermissions()) {
            this.loadPermissions();
        } else {
            this.givenPermissions()?.subscribe(data => {
                this.permissions.set(data);
            });
        }
    }

    protected shouldMarkInvalid(controlName: string): boolean {
        return this.formService.shouldMarkInvalid(this.userForm!, controlName);
    }

    protected onCancel(): void {
        this.toggleVisibility();
    }

    protected onSubmit(): void {
        if (this.userForm?.invalid) return;

        const userPatch: UserAdminPatchRequest = this.buildUserPatchRequest();
        const playerPatch: PlayerPatchRequest = this.buildPlayerPatchRequest();

        const hasUserChanges = Object.keys(userPatch).length > 0;
        const hasPlayerChanges = Object.keys(playerPatch).length > 0;

        if (!hasUserChanges && !hasPlayerChanges) {
            console.log('Keine Änderungen festgestellt.');
            this.toggleVisibility();
            return;
        }

        this.isLoading.set(true);

        const requests = {
            user: hasUserChanges
                ? this.userAdminApiService.patchUser(this.userData().id, userPatch)
                : of(this.userData()), // Falls kein Update, nimm alte Daten
            player: hasPlayerChanges
                ? this.playerAdminApiService.patchPlayer(this.userData().playerId, playerPatch)
                : of(null),
        };

        forkJoin(requests)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: result => {
                    const finalResponse: UserAdminResponse = {
                        ...result.user,
                        displayName: this.userForm?.get('displayName')?.value ?? result.user.displayName,
                    };

                    this.handleResponse(finalResponse);
                },
                error: err => {
                    console.error('Fehler beim Updaten:', err);
                },
            });
    }

    private handleResponse(updatedUser: UserAdminResponse): void {
        this.userChange.emit(updatedUser);
        this.toggleVisibility();
    }

    protected isSaveButtonDisabled(): boolean {
        const hasUserChanges = Object.keys(this.buildUserPatchRequest()).length > 0;
        const hasPlayerChanges = Object.keys(this.buildPlayerPatchRequest()).length > 0;

        return this.userForm?.invalid || this.isLoading() || (!hasUserChanges && !hasPlayerChanges);
    }

    private buildUserPatchRequest(): UserAdminPatchRequest {
        const originalValues = { ...this.userData() };
        const updatedValues = this.userForm?.getRawValue();

        return this.formService.getChangedValues(
            originalValues,
            updatedValues,
            this.formService.getKeys(originalValues)
        );
    }

    private buildPlayerPatchRequest(): PlayerPatchRequest {
        const originalValues = { displayName: this.userData().displayName };
        const updatedDisplayName = this.userForm?.get('displayName')?.value;
        const updatedValues = { displayName: updatedDisplayName };

        return this.formService.getChangedValues(originalValues, updatedValues, ['displayName']);
    }

    private toggleVisibility(): void {
        this.show.update(s => !s);
    }

    private loadRoles(): void {
        this.userAdminApiService.getAllRoles().subscribe(data => {
            this.roles.set(data);
        });
    }

    private loadPermissions(): void {
        this.userAdminApiService.getAllPermissions().subscribe(data => {
            this.permissions.set(data);
        });
    }

    // fa-icons
    protected readonly faCircleInfo = faCircleInfo;
}
