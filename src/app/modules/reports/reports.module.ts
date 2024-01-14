import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './page/reports.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    LayoutModule,
    FormsModule
  ]
})
export class ReportsModule { }
