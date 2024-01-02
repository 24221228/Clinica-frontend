import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    LateralMenuComponent,
    HeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FullCalendarModule
  ],
  exports: [
    LateralMenuComponent,
    HeaderComponent
  ]
})
export class SharedComponentsModule { }
