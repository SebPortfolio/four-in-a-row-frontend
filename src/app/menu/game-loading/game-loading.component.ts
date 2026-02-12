import { Component, input, InputSignal, OnInit } from '@angular/core';
import { GameModeUrl } from '../../common/types';
import { GameApiService } from '../../spiel/game-api.service';
import { Game } from '../../spiel/game.model';
import { GameService } from '../../spiel/game.service';

@Component({
    selector: 'app-game-loading',
    standalone: true,
    imports: [],
    templateUrl: './game-loading.component.html',
    styleUrl: './game-loading.component.less',
})
export class GameLoadingComponent implements OnInit {
    gameMode: InputSignal<GameModeUrl> = input.required<GameModeUrl>();

    games: Game[] = [];

    constructor(private gameApiService: GameApiService, private gameService: GameService) {}

    ngOnInit(): void {
        this.gameApiService.getAllGames();
    }
}
