import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPillComponent } from './audit-pill.component';

describe('AuditPillComponent', () => {
  let component: AuditPillComponent;
  let fixture: ComponentFixture<AuditPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
