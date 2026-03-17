import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, Observable } from 'rxjs';
import { DialogService } from '../../common/dialog/dialog.service';
import { FormService } from '../../common/form.service';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { displayNameFormatValidator } from '../../common/validators/displayNameFormat.validator';
import { UserAdminCreateRequest, UserAdminResponse } from '../admin.model';
import { UserAdminApiService } from '../user-admin-api.service';

@Component({
    selector: 'app-admin-user-create-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgbTooltip,
        FaIconComponent,
        NgSelectComponent,
        AsyncPipe,
        SpinnerComponent,
        TranslateModule,
    ],
    templateUrl: './admin-user-create-dialog.component.html',
    styleUrl: './admin-user-create-dialog.component.less',
})
export class AdminUserCreateDialogComponent implements OnInit {
    protected createForm!: FormGroup;
    protected roles$?: Observable<string[]>;
    protected permissions$?: Observable<string[]>;

    protected isLoading = signal<boolean>(false);

    constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
        private userAdminApiService: UserAdminApiService,
        private formService: FormService
    ) {}

    ngOnInit(): void {
        this.loadRoles();
        this.loadPermissions();
        this.initForm();
    }

    private initForm(): void {
        this.createForm = this.fb.group({
            displayName: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3), displayNameFormatValidator()],
            }),
            email: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            roles: this.fb.control(null),
            customPermissions: this.fb.control(null),
        });
    }

    protected shouldMarkInvalid(controlName: string): boolean {
        return this.formService.shouldMarkInvalid(this.createForm!, controlName);
    }

    protected onSubmit(): void {
        if (this.createForm.valid) {
            this.isLoading.set(true);

            const rawValue = this.createForm.getRawValue();
            const request: UserAdminCreateRequest = {
                ...rawValue,
                roles: rawValue.roles?.length ? rawValue.roles : undefined,
                customPermissions: rawValue.customPermissions?.length ? rawValue.customPermissions : undefined,
            };

            this.userAdminApiService
                .createUser(request)
                .pipe(finalize(() => this.isLoading.set(false)))
                .subscribe({
                    next: (user: UserAdminResponse) => {
                        console.log('Erstellter User: ', user);
                        this.dialogService.close(user);
                    },
                    error: err => {
                        console.warn('Fehler bei Erstellung eines neuen Users: ', err);
                    },
                });
        }
    }

    protected onClose(): void {
        this.dialogService.close();
    }

    private loadRoles(): void {
        this.roles$ = this.userAdminApiService.getAllRoles();
    }

    private loadPermissions(): void {
        this.permissions$ = this.userAdminApiService.getAllPermissions();
    }

    // fa-icons
    protected readonly faCircleInfo = faCircleInfo;
}
