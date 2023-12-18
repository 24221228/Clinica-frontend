import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { SharedComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
