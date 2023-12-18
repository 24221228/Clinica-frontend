import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverAccountComponent } from './page/recover-account.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RecoverAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverAccountRoutingModule { }
