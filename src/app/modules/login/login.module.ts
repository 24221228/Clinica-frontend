import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//import { provideErrorTailorConfig, errorTailorImports  } from '@ngneat/error-tailor';
import { ErrorTailorConfig, provideErrorTailorConfig } from '@ngneat/error-tailor';
import { errorTailorImports } from '@ngneat/error-tailor';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './page/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    errorTailorImports
  ],
  providers: [
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
export class LoginModule { }
