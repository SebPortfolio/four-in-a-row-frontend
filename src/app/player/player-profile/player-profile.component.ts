import { HttpErrorResponse } from '@angular/common/http';
import { Component, input, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../../common/dialog/dialog.service';
import { DisplayNameEditDialogComponent } from '../display-name-edit-dialog/display-name-edit-dialog.component';
import { PlayerApiService } from '../player-api.service';
import { PlayerStatisticComponent } from '../player-statistic/player-statistic.component';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
    selector: 'app-player-profile',
    standalone: true,
    imports: [PlayerStatisticComponent, FontAwesomeModule],
    templateUrl: './player-profile.component.html',
    styleUrl: './player-profile.component.less',
})
export class PlayerProfileComponent implements OnInit {
    playerId: Signal<number> = input.required<number>();
    player: Player | undefined;

    constructor(
        private playerService: PlayerService,
        private playerApiService: PlayerApiService,
        private dialogService: DialogService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.playerApiService.getPlayerById(this.playerId()).subscribe({
            next: (res: Player) => {
                if (!res) {
                    console.warn('Response des Spielers leer');
                    this.router.navigate(['..'], { relativeTo: this.route });
                }
                this.player = res;
            },
            error: (err: HttpErrorResponse) => {
                this.playerService.handlePlayerApiError(err);
            },
        });
    }

    onEditDisplayName(): void {
        this.dialogService
            .open({
                title: 'DISPLAY_NAME_EDIT_DIALOG.TITEL',
                component: DisplayNameEditDialogComponent,
                data: {
                    displayName: this.player?.displayName,
                    playerId: this.player?.id,
                },
            })
            .subscribe(res => {
                this.player = res;
            });
    }

    // fa-icons
    protected readonly faPenToSquare = faPenToSquare;
}
