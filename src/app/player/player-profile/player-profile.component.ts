import { Component, input, OnInit, Signal } from '@angular/core';
import { Player } from '../player.model';
import { PlayerApiService } from '../player-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from '../player.service';
import { PlayerStatisticComponent } from '../player-statistic/player-statistic.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-player-profile',
    standalone: true,
    imports: [PlayerStatisticComponent, CommonModule],
    templateUrl: './player-profile.component.html',
    styleUrl: './player-profile.component.less',
})
export class PlayerProfileComponent implements OnInit {
    playerId: Signal<number> = input.required<number>();
    player: Player | undefined;

    constructor(private playerService: PlayerService, private playerApiService: PlayerApiService) {}

    ngOnInit(): void {
        this.playerApiService.getPlayerById(this.playerId()).subscribe({
            next: (res: Player) => {
                this.player = res;
            },
            error: (err: HttpErrorResponse) => {
                this.playerService.handlePlayerError(err);
            },
        });
    }
}
