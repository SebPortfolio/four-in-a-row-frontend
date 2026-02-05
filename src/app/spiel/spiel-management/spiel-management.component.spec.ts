import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielManagementComponent } from './spiel-management.component';

describe('SpielManagementComponent', () => {
  let component: SpielManagementComponent;
  let fixture: ComponentFixture<SpielManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
