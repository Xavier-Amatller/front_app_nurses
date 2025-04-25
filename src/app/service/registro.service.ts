import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TipoDrenaje, RegistroResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  // Obtener el token dinámicamente
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Crear los encabezados con el token dinámicamente
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  // Modificar los métodos para usar los tipos
  getTiposDrenajes(): Observable<TipoDrenaje[]> {
    return this.http
      .get<TipoDrenaje[]>(`${this.apiUrl}/registro/tipos-drenajes`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
            return throwError(() => new Error('No autorizado. Redirigiendo al login...'));
          }
          return throwError(() => error);
        })
      );
  }

  createRegistro(registro: any): Observable<RegistroResponse> {
    return this.http
      .post<RegistroResponse>(`${this.apiUrl}/registro`, registro, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
            return throwError(() => new Error('No autorizado. Redirigiendo al login...'));
          }
          return throwError(() => error);
        })
      );
  }
}