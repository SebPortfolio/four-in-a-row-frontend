import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoadingComponent } from './game-loading.component';

describe('GameLoadingComponent', () => {
    let component: GameLoadingComponent;
    let fixture: ComponentFixture<GameLoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameLoadingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GameLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
