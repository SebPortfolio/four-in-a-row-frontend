import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../common/dialog/dialog.service';
import { PlayerApiService } from '../player-api.service';
import { Player, PlayerCreateRequest } from '../player.model';

@Component({
    selector: 'app-create-player-dialog',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-player-dialog.component.html',
    styleUrl: './create-player-dialog.component.less',
})
export class CreatePlayerDialogComponent {
    constructor(
        private fb: FormBuilder,
        private dialogService: DialogService,
        private playerApiService: PlayerApiService
    ) {}

    playerForm!: FormGroup;

    ngOnInit(): void {
        this.playerForm = this.fb.group({
            username: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(3)],
            }),
            email: this.fb.control('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
        });
    }

    onSubmit(): void {
        if (this.playerForm.valid) {
            const request: PlayerCreateRequest = this.playerForm.getRawValue();

            this.playerApiService.createPlayer(request).subscribe({
                next: (player: Player) => {
                    this.dialogService.close(player);
                },
                error: (err: HttpErrorResponse) => {
                    console.error('Backend-Fehler: ', err);
                    this.dialogService.close();
                },
            });
        }
    }

    onCancel(): void {
        this.dialogService.close();
    }
}
