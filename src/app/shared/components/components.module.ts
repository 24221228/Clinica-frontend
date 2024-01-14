import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    LateralMenuComponent,
    HeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LateralMenuComponent,
    HeaderComponent,
    CalendarComponent
  ]
})
export class SharedComponentsModule { }
