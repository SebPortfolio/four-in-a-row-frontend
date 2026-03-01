import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserOverviewComponent } from './admin-user-overview.component';

describe('AdminUserManagementComponent', () => {
    let component: AdminUserOverviewComponent;
    let fixture: ComponentFixture<AdminUserOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminUserOverviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminUserOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
