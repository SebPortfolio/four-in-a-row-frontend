import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
        private playerApiService: PlayerApiService,
        private router: Router
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

            console.log('Finaler Request für das Backend:', request);

            this.playerApiService.createPlayer(request).subscribe({
                next: (player: Player) => {
                    this.dialogService.close();
                    this.router.navigate(['players', player.id]);
                },
                error: (err: HttpErrorResponse) => {
                    console.error('Backend-Fehler: ', err);
                },
            });
        }
    }

    onCancel(): void {
        this.dialogService.close();
    }
}
