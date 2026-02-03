import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinzelspielerMenuComponent } from './einzelspieler-menu.component';

describe('EinzelspielerMenuComponent', () => {
  let component: EinzelspielerMenuComponent;
  let fixture: ComponentFixture<EinzelspielerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EinzelspielerMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EinzelspielerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
