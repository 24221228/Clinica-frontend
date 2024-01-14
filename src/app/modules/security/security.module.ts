import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './page/security.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    SecurityComponent,
    SearchFormComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SharedComponentsModule
  ],
  providers: [
    ToastrService
  ]
})
export class SecurityModule { }
