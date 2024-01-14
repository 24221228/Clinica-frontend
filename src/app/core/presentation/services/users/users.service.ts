import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {
  CreateUserWithPersonDto,
  UpdateUserDto,
  Person,
  User,
  CreateUserWithPersonResponse
} from '../../interfaces';


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

  createUserWithPerson(userData: CreateUserWithPersonDto): Observable<CreateUserWithPersonResponse> {
    const url = `${this.apiURL}usuarios/createAccount`;
    return this.http.post<CreateUserWithPersonResponse>(url, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    //return throwError('Hubo un error en la solicitud. Por favor, inténtelo de nuevo.');
    if (error.status === 400 || error.status === 401) {
      return throwError(error.error);
    }else {
      return throwError('Hubo un error en la solicitud. Por favor, inténtelo de nuevo.');
    }
  }
}
