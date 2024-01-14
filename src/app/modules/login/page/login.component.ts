import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Login, ErrorLogin, CreateUserWithPersonDto, CreateUserWithPersonResponse } from 'src/app/core/presentation/interfaces/index';
import { AuthService } from 'src/app/core/presentation/services/authentication/auth.service';
import { GlobalService } from 'src/app/core/presentation/services/global.service';
import { UsersService } from 'src/app/core/presentation/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  activeTab = 'tab1';
  iniciarSesionForm: FormGroup;
  registrarCuentaForm: FormGroup;
  messageError: string = '';
  isLoginSuccessful: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private userService: UsersService,
    private toastService: ToastrService){
    this.iniciarSesionForm = this.formBuilder.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registrarCuentaForm = this.formBuilder.group({
      nombreRegistrame: ['', [Validators.required]],
      apellidosRegistrame: ['', [Validators.required]],
      emailRegistrame: ['', [Validators.required, Validators.email]],
      passwordRegistrame: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
  ngOnInit(): void {
    this.activeTab = 'tab1';
  }
  login():void{
    const {correo_electronico, contraseña} = this.iniciarSesionForm.value;
    this.authService.login(correo_electronico, contraseña).subscribe({
      next: (user: Login) => {
        const data = JSON.stringify(user);
        this.globalService.saveDataStorage("USER_DATA", data);
        this.isLoginSuccessful = true;

        timer(1500).subscribe(() => {
          this.router.navigate(['dashboard']);
        });
      },
      error: (error: ErrorLogin) => {
        this.isLoginSuccessful = false;
        switch (error.status) {
          case 400:
            this.messageError = error.error.message[0];
            console.log('Error al iniciar sesión (400)', error.error.message[0]);
            return error.error.message[0];//Bad Request
        
          case 401:
            this.messageError = error.error.message;
            console.log('Error al iniciar sesión (401)', error.error.message);
            return error.error.message;//Unauthorized
        }
        
        return error;
      }
    })
  }

  registrarCuenta(): void{
    const {nombreRegistrame, apellidosRegistrame, emailRegistrame, passwordRegistrame } = this.registrarCuentaForm.value;
    let data: CreateUserWithPersonDto = {
      correo_electronico: emailRegistrame,
      contraseña: passwordRegistrame,
      nombres: nombreRegistrame,
      apellidos: apellidosRegistrame
    }
    this.userService.createUserWithPerson(data).subscribe({
      next: (_response: CreateUserWithPersonResponse) => {
        this.registrarCuentaForm.reset()
        this.toastService.success('¡La cuenta se registro correctamente!');
        timer(800).subscribe(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        switch (error.statusCode) {
          case 400:
            this.messageError = error.message[0];
            return error.message[0];//Bad Request
        
          case 401:
            this.messageError = error.message;
            return error.message[0];//Unauthorized
        }
        
        return error;
      }
    })
  }
}
