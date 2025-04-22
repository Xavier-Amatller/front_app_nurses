import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'authToken';
  private auxIdKey = 'auxId';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
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