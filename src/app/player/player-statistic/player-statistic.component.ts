import { Component, Input } from '@angular/core';
import { Player } from '../player.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-player-statistic',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './player-statistic.component.html',
    styleUrl: './player-statistic.component.less',
})
export class PlayerStatisticComponent {
    @Input() player!: Player;
}
