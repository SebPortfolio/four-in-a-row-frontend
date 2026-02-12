import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MehrspielerLokalMenuComponent } from './mehrspieler-lokal-menu.component';

describe('MehrspielerLokalMenuComponent', () => {
    let component: MehrspielerLokalMenuComponent;
    let fixture: ComponentFixture<MehrspielerLokalMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MehrspielerLokalMenuComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MehrspielerLokalMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
