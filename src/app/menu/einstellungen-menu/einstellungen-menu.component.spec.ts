import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinstellungenMenuComponent } from './einstellungen-menu.component';

describe('EinstellungenMenuComponent', () => {
    let component: EinstellungenMenuComponent;
    let fixture: ComponentFixture<EinstellungenMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EinstellungenMenuComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EinstellungenMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
