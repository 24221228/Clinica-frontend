import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSpecialtyRoutingModule } from './register-specialty-routing.module';
import { RegisterSpecialtyComponent } from './page/register-specialty.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    RegisterSpecialtyComponent
  ],
  imports: [
    CommonModule,
    RegisterSpecialtyRoutingModule,
    LayoutModule
  ]
})
export class RegisterSpecialtyModule { }
