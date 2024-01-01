import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, ErrorLogin } from 'src/app/core/presentation/interfaces/index';
import { AuthService } from 'src/app/core/presentation/services/authentication/auth.service';
import { GlobalService } from 'src/app/core/presentation/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  activeTab = 'tab1';
  iniciarSesionForm: FormGroup;
  messageError: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService){
    this.iniciarSesionForm = this.formBuilder.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
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
        //console.log("usuario ->",user);
        const data = JSON.stringify(user);
        this.globalService.saveDataStorage("USER_DATA", data);
        //console.log(this.globalService.getDataFromStorage<String>('token'));
        this.router.navigate(['dashboard']);
      },
      error: (error: ErrorLogin) => {
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
  onPasswordInput() {
    const passwordControl = this.iniciarSesionForm.get('contraseña');
    if (passwordControl) {
      console.log(passwordControl.value);
    }
  }
}
