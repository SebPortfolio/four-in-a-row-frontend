import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from '../../common/dialog/dialog.service';
import { FormService } from '../../common/form.service';
import { displayNameFormatValidator } from '../../common/validators/displayNameFormat.validator';
import { PlayerApiService } from '../player-api.service';
import { Player, PlayerPatchRequest } from '../player.model';

@Component({
    selector: 'app-display-name-edit-dialog',
    standalone: true,
    imports: [ReactiveFormsModule, NgbTooltip, FaIconComponent, TranslateModule],
    templateUrl: './display-name-edit-dialog.component.html',
    styleUrl: './display-name-edit-dialog.component.less',
})
export class DisplayNameEditDialogComponent implements OnInit {
    playerId = input.required<number>();
    displayName = input.required<string>();
    form?: FormGroup;

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private dialogService: DialogService,
        private playerApiService: PlayerApiService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.fb.group({
            displayName: this.fb.control(this.displayName(), {
                nonNullable: true,
                validators: [Validators.required, displayNameFormatValidator()],
            }),
        });
    }

    protected shouldMarkInvalid(controlName: string): boolean {
        return this.formService.shouldMarkInvalid(this.form!, controlName);
    }

    protected isSaveButtonDisabled(): boolean {
        return this.form?.invalid || Object.keys(this.buildRequest()).length === 0;
    }

    private buildRequest(): PlayerPatchRequest {
        const originalValue = { displayName: this.displayName() };
        const updatedValue: PlayerPatchRequest = this.form?.getRawValue();

        return this.formService.getChangedValues(originalValue, updatedValue, ['displayName']);
    }

    protected onSave(): void {
        const request = this.buildRequest();
        if (request.displayName) {
            this.playerApiService.patchPlayer(this.playerId(), request).subscribe({
                next: (res: Player) => {
                    this.dialogService.close(res);
                },
                error: err => {
                    console.error('Fehler beim Player patch: ', err);
                },
            });
        } else {
            console.warn('Keine Änderung erkannt, kein Patch ausgelöst');
        }
    }

    protected onCancel(): void {
        this.dialogService.close();
    }

    // fa-icons
    protected readonly faCircleInfo = faCircleInfo;
}
