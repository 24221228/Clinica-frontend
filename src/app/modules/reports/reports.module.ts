import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './page/reports.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    LayoutModule
  ]
})
export class ReportsModule { }
