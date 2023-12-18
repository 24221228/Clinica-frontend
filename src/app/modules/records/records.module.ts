import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './page/records.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecordsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    LayoutModule,
    FormsModule
  ]
})
export class RecordsModule { }
