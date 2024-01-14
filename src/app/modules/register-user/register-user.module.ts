import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './page/register-user.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    errorTailorImports,
    ToastrModule.forRoot({
      timeOut: 1500,
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
export class RegisterUserModule { }
