import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent, TableColumn, TableConfig } from '../../common/datatable/datatable/datatable.component';
import { DialogService } from '../../common/dialog/dialog.service';
import { CreatePlayerDialogComponent } from '../create-player-dialog/create-player-dialog.component';
import { PlayerApiService } from '../player-api.service';
import { Player } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
    selector: 'app-player-overview',
    standalone: true,
    imports: [DatatableComponent, FaIconComponent],
    templateUrl: './player-overview.component.html',
    styleUrl: './player-overview.component.less',
})
export class PlayerOverviewComponent implements OnInit {
    players?: Player[];
    tableConfig?: TableConfig;

    constructor(
        private dialogService: DialogService,
        private playerService: PlayerService,
        private playerApiService: PlayerApiService
    ) {}

    faUserPlus = faUserPlus;

    ngOnInit(): void {
        this.buildConfig();
        this.loadPlayers();
    }

    onCreatePlayer(): void {
        this.dialogService
            .open({
                title: 'Neuen Spieler anlegen',
                component: CreatePlayerDialogComponent,
            })
            .subscribe((res?: Player) => {
                console.log('dialog res: ', res);
                if (res) {
                    this.loadPlayers();
                }
            });
    }

    private loadPlayers(): void {
        this.playerApiService.getAllPlayers().subscribe({
            next: (res: Player[]) => {
                this.players = [...res];
            },
            error: (err: HttpErrorResponse) => {
                this.playerService.handlePlayerApiError(err);
            },
        });
    }

    private buildConfig(): void {
        this.tableConfig = {
            title: 'Spieler',
            messages: {
                emptyMessage: 'Keine Spieler gefunden',
            },
            columns: this.getColumns(),
        };
    }

    private getColumns(): TableColumn[] {
        return [
            { name: 'Id', prop: 'id', minWidth: 50, width: 80, maxWidth: 100 },
            { name: 'Username', prop: 'username', width: 300 },
            { name: 'Games played', prop: 'totalGames', minWidth: 110, width: 160 },
            { name: 'Games won', prop: 'gamesWon', minWidth: 100, width: 160 },
            { name: 'Games lost', prop: 'gamesLost', minWidth: 100, width: 160 },
            { name: 'Games surrendered', prop: 'gamesSurrendered', minWidth: 160, width: 160 },
        ];
    }
}
