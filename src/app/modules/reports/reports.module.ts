import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './page/reports.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { FormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from 'src/app/shared/components/tabla-dinamica/tabla-dinamica.component';
import { ModalDinamicoComponent } from 'src/app/shared/components/modal-dinamico/modal-dinamico.component';


@NgModule({
  declarations: [
    TablaDinamicaComponent,
    ReportsComponent,
    ModalDinamicoComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    LayoutModule,
    FormsModule
  ]
})
export class ReportsModule { }
