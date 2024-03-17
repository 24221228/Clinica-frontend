import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourRangePickerComponent } from './hour-range-picker.component';

describe('HourRangePickerComponent', () => {
  let component: HourRangePickerComponent;
  let fixture: ComponentFixture<HourRangePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourRangePickerComponent]
    });
    fixture = TestBed.createComponent(HourRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
