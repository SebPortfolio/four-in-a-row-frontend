import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNameEditDialogComponent } from './display-name-edit-dialog.component';

describe('DisplayNameEditDialogComponent', () => {
    let component: DisplayNameEditDialogComponent;
    let fixture: ComponentFixture<DisplayNameEditDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DisplayNameEditDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DisplayNameEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
