import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { CreateUserWithPersonDto, CreateUserWithPersonResponse } from 'src/app/core/presentation/interfaces';
import { UsersService } from 'src/app/core/presentation/services/users/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  registrarUsuarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastService: ToastrService){
    this.registrarUsuarioForm = this.formBuilder.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      direccion_completa: ['', [Validators.required]],
      numero_telefono: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      sede: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {}

  registrarUsuario(): void{
    const {correo_electronico, nombres, apellidos, tipo_documento, numero_documento, nacionalidad, fecha_nacimiento, genero, departamento, provincia, distrito, direccion_completa, numero_telefono, roles, sede } = this.registrarUsuarioForm.value;
    let primeraLetraApellido = apellidos.charAt(0).toUpperCase();
    let primeraLetraNombre = nombres.charAt(0).toLowerCase();
    let usuario: CreateUserWithPersonDto = {
      nombres: nombres,
      apellidos: apellidos,
      genero: genero,
      documento_tipo: tipo_documento,
      documento_numero: parseInt(numero_documento),
      fecha_nacimiento: fecha_nacimiento,
      direccion_completa: direccion_completa,
      numero_telefono: parseInt(numero_telefono),
      ciudad: distrito,
      pais: nacionalidad,
      correo_electronico: correo_electronico,
      contraseña: primeraLetraApellido + primeraLetraNombre + numero_documento.toString(),
      roles: [roles]
    }

    this.userService.createUserWithPerson(usuario).subscribe({
      next: (_response: CreateUserWithPersonResponse) => {
        this.registrarUsuarioForm.reset()
        this.toastService.success('¡La cuenta se registro correctamente!');
        timer(800).subscribe(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        switch (error.statusCode) {
          case 400:
            this.toastService.error(error.message[0]);
            return error.message[0];//Bad Request
        
          case 401:
            return error.message[0];//Unauthorized
        }
        
        return error;
      }
    })
  }
}
