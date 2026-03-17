import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserHistoryPanelComponent } from './admin-user-history-panel.component';

describe('AdminUserHistoryPanelComponent', () => {
  let component: AdminUserHistoryPanelComponent;
  let fixture: ComponentFixture<AdminUserHistoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserHistoryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserHistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
