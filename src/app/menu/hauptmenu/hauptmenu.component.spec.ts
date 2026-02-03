import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HauptmenuComponent } from './hauptmenu.component';

describe('HauptenuComponent', () => {
  let component: HauptmenuComponent;
  let fixture: ComponentFixture<HauptmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HauptmenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HauptmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
