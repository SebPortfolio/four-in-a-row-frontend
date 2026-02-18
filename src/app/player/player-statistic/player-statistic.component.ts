import { Component, Input } from '@angular/core';
import { Player } from '../player.model';

@Component({
    selector: 'app-player-statistic',
    standalone: true,
    imports: [],
    templateUrl: './player-statistic.component.html',
    styleUrl: './player-statistic.component.less',
})
export class PlayerStatisticComponent {
    @Input() player!: Player;
}
