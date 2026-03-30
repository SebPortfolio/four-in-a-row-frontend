import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastModifiedInfoComponent } from './last-modified-info.component';

describe('LastModifiedInfoComponent', () => {
  let component: LastModifiedInfoComponent;
  let fixture: ComponentFixture<LastModifiedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastModifiedInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastModifiedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
