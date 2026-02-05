import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielBrettComponent } from './spiel-brett.component';

describe('SpielBrettComponent', () => {
    let component: SpielBrettComponent;
    let fixture: ComponentFixture<SpielBrettComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SpielBrettComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SpielBrettComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
