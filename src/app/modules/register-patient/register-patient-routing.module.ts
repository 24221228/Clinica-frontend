import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPatientComponent } from './page/register-patient.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {
      path: '',
      component: RegisterPatientComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPatientRoutingModule { }
