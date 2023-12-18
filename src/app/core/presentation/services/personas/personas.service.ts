import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/login.interface';
import { SearchPerson } from '../../interfaces/searchPerson.interface';
import { UpdatePerson } from '../../interfaces/update.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private apiURL = 'http://localhost:9000/api/'
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
  
  searchByProperty(property: string, searchPerson: SearchPerson): Observable<Person[]> {
    const url = `${this.apiURL}personas/search/?property=${property}`;

    return this.http.post<Person[]>(url, searchPerson)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  update(id: number, updatePerson: UpdatePerson): Observable<Person>{
    const url = `${this.apiURL}personas/${id}`;
    return this.http.patch<Person>(url, updatePerson)
      .pipe(
        catchError(error => {
          throw error;
        })
      )
  }
}
