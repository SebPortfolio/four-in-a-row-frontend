import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../common/dialog/dialog.service';
import { CreatePlayerDialogComponent } from '../create-player-dialog/create-player-dialog.component';
import { Player } from '../player.model';
import { RouterLink } from '@angular/router';
import { PlayerApiService } from '../player-api.service';
import { HttpErrorResponse } from '@angular/common/http';
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
                this.playerService.handlePlayerError(err);
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
