import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAppointmentComponent } from './page/register-appointment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RegisterAppointmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAppointmentRoutingModule { }
