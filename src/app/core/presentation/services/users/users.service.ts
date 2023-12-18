import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { Person } from '../../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://localhost:9000/api/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiURL}personas`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener personas:', error);
          throw error;
        })
      );
  }
}
