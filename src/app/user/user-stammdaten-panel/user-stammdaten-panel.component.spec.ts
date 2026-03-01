import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStammdatenPanelComponent } from './user-stammdaten-panel.component';

describe('UserStammdatenPanelComponent', () => {
    let component: UserStammdatenPanelComponent;
    let fixture: ComponentFixture<UserStammdatenPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserStammdatenPanelComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserStammdatenPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
