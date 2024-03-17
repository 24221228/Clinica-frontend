import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';

import { RegisterSpecialtyRoutingModule } from './register-specialty-routing.module';
import { RegisterSpecialtyComponent } from './page/register-specialty.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [
    RegisterSpecialtyComponent
  ],
  imports: [
    CommonModule,
    RegisterSpecialtyRoutingModule,
    LayoutModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    errorTailorImports,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    ToastrService,
    provideErrorTailorConfig({
      errors: {
        useValue: {
          minlength: ({ requiredLength }) => `La longitud mínima requerida es de ${requiredLength} caracteres`,
          email: 'El correo electrónico no es válido',
          required: 'Este campo es obligatorio',
        }
      }
    })
  ]
})
export class RegisterSpecialtyModule { }
