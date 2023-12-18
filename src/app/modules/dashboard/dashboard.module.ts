import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    DashboardRoutingModule,
    LayoutModule,
    FormsModule
  ]
})
export class DashboardModule { }
