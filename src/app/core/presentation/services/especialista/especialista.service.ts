import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Especialista } from '../../interfaces/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private apiURL = 'http://localhost:9000/api/'
  constructor(private http: HttpClient) { }


getAll(): Observable<Especialista[]> {
  return this.http.get<Especialista[]>(`${this.apiURL}specialties`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener especialistas:', error);
        throw error;
      })
    );
}

}
