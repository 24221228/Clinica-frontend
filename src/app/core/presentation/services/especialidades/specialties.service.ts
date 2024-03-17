import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateSpecialtyDto } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  private apiURL = 'http://localhost:9000/api/';
  constructor(private http: HttpClient) { }

  createSpecialty(userData: CreateSpecialtyDto): Observable<CreateSpecialtyDto> {
    const url = `${this.apiURL}specialties`;
    return this.http.post<CreateSpecialtyDto>(url, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 400 || error.status === 401) {
      return throwError(error.error);
    }else {
      return throwError('Hubo un error en la solicitud. Por favor, inténtelo de nuevo.');
    }
  }
}
