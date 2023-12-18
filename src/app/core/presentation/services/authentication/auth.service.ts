import { Injectable } from '@angular/core';

import { Login } from '../../interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { VariablesSessionRemove } from 'src/app/shared/helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:9000/api/'
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router
    ) { }
  
  login(correo_electronico: string, contraseña: string): Observable<Login>{
    const loginData = {correo_electronico, contraseña};
    return this.http.post<Login>(`${this.apiURL}usuarios/login`, loginData);
  }

  async logout(){
    //Se eliminan las sessiones principales
    let sesiones = Object.values(VariablesSessionRemove);

    sesiones.forEach(sesion => {
      this.globalService.removeDataStorage(sesion);
    });
    this.router.navigate(['/']);
  }
}
