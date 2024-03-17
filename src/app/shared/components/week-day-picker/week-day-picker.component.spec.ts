import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayPickerComponent } from './week-day-picker.component';

describe('WeekDayPickerComponent', () => {
  let component: WeekDayPickerComponent;
  let fixture: ComponentFixture<WeekDayPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekDayPickerComponent]
    });
    fixture = TestBed.createComponent(WeekDayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
