import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private tokenKey = 'authToken';
  private auxIdKey = 'auxId';
  private roleKey = 'role'; // Nueva clave para el rol

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  login(aux_num_trabajador: string, aux_password: string): Observable<any> {
    const data = {
      aux_num_trabajador,
      aux_password
    };
    return this.http.post('http://127.0.0.1:8000/api/login', data, {
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  // Procesar la respuesta del login y guardar token, userId y role
  setAuthData(response: any): void {
    const { token, userId, roles } = response; // Ajusta según la estructura de la respuesta del backend
    this.setToken(token);
    this.setAuxiliarId(userId);
    this.setRole(roles);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.auxIdKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.tokenKey);

    this.router.navigate(['/login']);
  }

  setAuxiliarId(auxId: string): void {
    localStorage.setItem(this.auxIdKey, auxId);
  }

  getAuxiliarId(): string | null {
    return localStorage.getItem(this.auxIdKey);
  }

  setRole(role: string): void {
    console.log('Setting role:', role);
    
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN'; 
  }
}