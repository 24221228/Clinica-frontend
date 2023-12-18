import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSpecialtyComponent } from './page/register-specialty.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RegisterSpecialtyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterSpecialtyRoutingModule { }
