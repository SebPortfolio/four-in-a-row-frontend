import { Component, input, InputSignal, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BackendSelectComponent } from '../../common/backend-select/backend-select.component';
import { GameModeUrl } from '../../common/types';
import { PlayerApiService } from '../../player/player-api.service';
import { Player } from '../../player/player.model';
import { PlayerService } from '../../player/player.service';
import { GameApiService } from '../../spiel/game-api.service';
import { Game } from '../../spiel/game.model';
import { GameService } from '../../spiel/game.service';
import { mapGameModeUrlToEnum } from '../../spiel/mapper/game-mode-url.mapper';

@Component({
    selector: 'app-game-creation',
    standalone: true,
    imports: [BackendSelectComponent],
    templateUrl: './game-creation.component.html',
    styleUrl: './game-creation.component.less',
})
export class GameCreationComponent implements OnInit {
    gameMode: InputSignal<GameModeUrl> = input.required<GameModeUrl>();
    player1?: Player;
    player2?: Player;
    @ViewChildren(BackendSelectComponent) selectComponents!: QueryList<BackendSelectComponent>;

    constructor(
        private playerApiService: PlayerApiService,
        private playerService: PlayerService,
        private gameApiService: GameApiService,
        private gameService: GameService,
        private router: Router
    ) {}

    ngOnInit(): void {
        console.log('GameMode: ', this.gameMode());
    }

    readonly searchProvider = (searchTerm: string): Observable<Player[]> => this.searchPlayerByUsername(searchTerm);

    protected searchPlayerByUsername(searchTerm: string): Observable<Player[]> {
        return this.playerApiService.getAllPlayers().pipe(
            map(players => {
                console.log(players);
                return players.filter(player => player.username.toLowerCase().includes(searchTerm.toLowerCase()));
            })
        );
    }

    protected onPlayerSelected(selectedPlayer: Player, playerSlot: 1 | 2): void {
        if (!selectedPlayer) {
            return this.clearInternPlayer(playerSlot);
        }

        const alreadySelected = this.player1?.id === selectedPlayer.id || this.player2?.id === selectedPlayer.id;

        if (alreadySelected) {
            return this.clearSelected(playerSlot);
        }

        if (playerSlot === 1) {
            this.player1 = selectedPlayer;
        } else {
            this.player2 = selectedPlayer;
        }
    }

    private clearSelected(playerSlot: 1 | 2): void {
        console.warn('Doppelbelegung verhindert!');

        this.clearSelectUi(playerSlot);
        this.clearInternPlayer(playerSlot);
    }

    private clearInternPlayer(playerSlot: 1 | 2): void {
        if (playerSlot === 1) {
            this.player1 = undefined;
        } else {
            this.player2 = undefined;
        }
    }

    private clearSelectUi(playerSlot: 1 | 2): void {
        const componentToClear = this.selectComponents.toArray()[playerSlot - 1];
        componentToClear.clear();
    }

    protected onStart(): void {
        if (this.player1 && this.player2) {
            const apiMode = mapGameModeUrlToEnum(this.gameMode());

            this.gameApiService.createGame(this.player1.id, this.player2.id, apiMode).subscribe({
                next: (game: Game) => {
                    console.log('Spiel erstellt: ', game);
                    this.router.navigate([this.gameMode(), 'games', game.id]);
                },
                error: err => {
                    this.gameService.handleGameApiError(err);
                },
            });
        }
    }
}
