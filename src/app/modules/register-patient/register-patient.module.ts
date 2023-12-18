import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPatientRoutingModule } from './register-patient-routing.module';
import { RegisterPatientComponent } from './page/register-patient.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    RegisterPatientComponent
  ],
  imports: [
    CommonModule,
    RegisterPatientRoutingModule,
    LayoutModule
  ]
})
export class RegisterPatientModule { }
