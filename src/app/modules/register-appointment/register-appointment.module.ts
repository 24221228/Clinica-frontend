import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAppointmentRoutingModule } from './register-appointment-routing.module';
import { RegisterAppointmentComponent } from './page/register-appointment.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterAppointmentComponent
  ],
  imports: [
    CommonModule,
    RegisterAppointmentRoutingModule,
    LayoutModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class RegisterAppointmentModule { }
