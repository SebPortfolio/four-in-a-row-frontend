import { Component, input, InputSignal, OnInit } from '@angular/core';
import { DatatableComponent, TableConfig } from '../../common/datatable/datatable/datatable.component';
import { GameModeUrl } from '../../common/types';
import { GameApiService } from '../../spiel/game-api.service';
import { Game } from '../../spiel/game.model';
import { GameService } from '../../spiel/game.service';

@Component({
    selector: 'app-game-loading',
    standalone: true,
    imports: [DatatableComponent],
    templateUrl: './game-loading.component.html',
    styleUrl: './game-loading.component.less',
})
export class GameLoadingComponent implements OnInit {
    gameMode: InputSignal<GameModeUrl> = input.required<GameModeUrl>();

    games: Game[] = [];

    constructor(
        private gameApiService: GameApiService,
        private gameService: GameService
    ) {}

    ngOnInit(): void {
        this.gameApiService.getAllGames();
    }

    protected testData: object[] = [
        { name: 'Austin', gender: 'M', company: 'Swimlane', priority: 'middle', isActive: true },
        { name: 'Dany', gender: 'M', company: 'KFC', priority: 'low', isActive: false },
        { name: 'Molly', gender: 'F', company: 'Burger King', priority: 'middle', isActive: false },
        { name: 'Frank', gender: 'M', company: 'McDonalds', priority: 'low', isActive: true },
        { name: 'Silvy', gender: 'F', company: 'Deichmann', priority: 'high', isActive: false },
        { name: 'Lisa', gender: 'F', company: 'Rewe', priority: 'high', isActive: true },
        { name: 'Willy', gender: 'M', priority: 'middle', isActive: false },
        { name: 'Jasmin', gender: 'F', company: 'Hay Day', priority: 'high', isActive: true },
        { name: 'Willhelm', gender: 'M', priority: 'low', isActive: false },
        { name: 'Jayda', gender: 'F', company: 'DM', priority: 'middle', isActive: true },
        { name: 'Jadzia', gender: 'F', company: 'Versache', priority: 'middle', isActive: false },
        { name: 'Wolfgang', gender: 'M', priority: 'low', isActive: false },
        { name: 'Tim', gender: 'M', priority: 'low', isActive: true },
        { name: 'Astrid', gender: 'F', priority: 'high', isActive: true },
        { name: 'Bärbel 2', gender: 'F', priority: 'middle', isActive: true },
        { name: 'Bärbel 1', gender: 'F', priority: 'middle', isActive: false },
        { name: 'Barbara', gender: 'F', priority: 'low', isActive: true },
    ];

    protected testConfig: TableConfig = {
        title: 'Test Tabelle',
        columns: [
            { name: 'Name', prop: 'name', width: 300 },
            {
                name: 'Geschlecht',
                prop: 'gender',
                width: 20,
                transform: val => (val === 'M' ? 'Male' : 'Female'),
            },
            { name: 'Unternehmen', prop: 'company', noDataStr: '-', width: 300, emptyValuesAtBottom: false },
            {
                name: 'Priorität',
                prop: 'priority',
                width: 20,
                maxWidth: 100,
                comparator: (a, b) => {
                    const map: { [key: string]: number } = { high: 3, middle: 2, low: 1 };
                    return map[b] - map[a]; // Sortiert Hoch nach oben
                },
            },
            {
                name: 'Status',
                prop: 'isActive',
                width: 20,
                maxWidth: 100,
                transform: val => (val ? 'Activ' : 'Inactiv'),
                comparator: (a, b) => (a === b ? 0 : a ? -1 : 1), // aktive (true) zuerst
            },
        ],
    };
}
