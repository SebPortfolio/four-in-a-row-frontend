import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { CommonModule } from '@angular/common';
import { SpielSteinComponent } from '../spiel-stein/spiel-stein.component';

@Component({
    selector: 'app-spiel-brett',
    standalone: true,
    imports: [CommonModule, SpielSteinComponent],
    templateUrl: './spiel-brett.component.html',
    styleUrl: './spiel-brett.component.less',
})
export class SpielBrettComponent implements OnInit {
    game: InputSignal<Game> = input.required<Game>();

    ngOnInit(): void {
        console.log('SpielBrettComponent initialized with game:', this.game());
    }
}
