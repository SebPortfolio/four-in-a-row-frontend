import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielSteinComponent } from './spiel-stein.component';

describe('SpielSteinComponent', () => {
  let component: SpielSteinComponent;
  let fixture: ComponentFixture<SpielSteinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielSteinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielSteinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
