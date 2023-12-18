import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAppointmentRoutingModule } from './register-appointment-routing.module';
import { RegisterAppointmentComponent } from './page/register-appointment.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    RegisterAppointmentComponent
  ],
  imports: [
    CommonModule,
    RegisterAppointmentRoutingModule,
    LayoutModule
  ]
})
export class RegisterAppointmentModule { }
