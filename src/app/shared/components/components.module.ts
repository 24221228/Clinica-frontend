import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { WeekDayPickerComponent } from './week-day-picker/week-day-picker.component';
import { HourRangePickerComponent } from './hour-range-picker/hour-range-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LateralMenuComponent,
    HeaderComponent,
    CalendarComponent,
    WeekDayPickerComponent,
    HourRangePickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LateralMenuComponent,
    HeaderComponent,
    CalendarComponent,
    WeekDayPickerComponent,
    HourRangePickerComponent
  ]
})
export class SharedComponentsModule { }
