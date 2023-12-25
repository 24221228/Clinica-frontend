import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { Person, User } from '../../interfaces/login.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UpdateUserDto } from '../../interfaces/UpdateUserDto';


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

  update(id: number, updateUserDto: UpdateUserDto): Observable<User> {
    const url = `${this.apiURL}usuarios/${id}`;
    console.log("url ->", url)
    return this.http.patch<User>(url, updateUserDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(_error: any): Observable<never> {
    return throwError('Hubo un error en la solicitud. Por favor, inténtelo de nuevo.');
  }
}
