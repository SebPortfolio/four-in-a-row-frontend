import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCreateDialogComponent } from './admin-user-create-dialog.component';

describe('AdminUserCreateDialogComponent', () => {
    let component: AdminUserCreateDialogComponent;
    let fixture: ComponentFixture<AdminUserCreateDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminUserCreateDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminUserCreateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
