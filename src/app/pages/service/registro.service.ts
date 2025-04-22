import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'authToken';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuxiliarId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.aux_num_trabajador;
    } catch (e) {
      console.error('Error decodificando el token', e);
      return null;
    }
  }

  createRegistro(registro: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/registro`, registro, { headers });
  }
}