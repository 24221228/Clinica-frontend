import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './page/permissions.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserTableComponent } from './components/user-table/user-table.component';
import { SearchFormComponent } from './components/search-form/search-form.component';


@NgModule({
  declarations: [
    PermissionsComponent,
    UserTableComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    ToastrService
  ]
})
export class PermissionsModule { }
