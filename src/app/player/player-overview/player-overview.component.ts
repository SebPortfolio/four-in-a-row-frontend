import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../common/dialog/dialog.service';
import { CreatePlayerDialogComponent } from '../create-player-dialog/create-player-dialog.component';
import { PlayerApiService } from '../player-api.service';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
    selector: 'app-player-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './player-overview.component.html',
    styleUrl: './player-overview.component.less',
})
export class PlayerOverviewComponent implements OnInit {
    players: Player[] | undefined;

    constructor(
        private dialogService: DialogService,
        private playerService: PlayerService,
        private playerApiService: PlayerApiService
    ) {}

    ngOnInit(): void {
        this.playerApiService.getAllPlayers().subscribe({
            next: (res: Player[]) => {
                this.players = res;
            },
            error: (err: HttpErrorResponse) => {
                this.playerService.handlePlayerApiError(err);
            },
        });
    }

    onCreatePlayer(): void {
        this.dialogService.open({
            title: 'Neuen Spieler anlegen',
            component: CreatePlayerDialogComponent,
        });
    }
}
