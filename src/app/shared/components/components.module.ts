import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LateralMenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LateralMenuComponent,
    HeaderComponent
  ]
})
export class SharedComponentsModule { }
