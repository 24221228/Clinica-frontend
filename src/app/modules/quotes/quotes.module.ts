import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './page/quotes.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    QuotesComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    LayoutModule,
    SharedComponentsModule
  ]
})
export class QuotesModule { }
