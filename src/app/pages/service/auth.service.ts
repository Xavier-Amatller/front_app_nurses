import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
    private token = 'authToken';

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) {}

    login(aux_num_trabajador: string, aux_password: string): Observable<any> {
        let data: FormData = new FormData();
        data.append('aux_number',aux_num_trabajador);
        data.append('password', aux_password);
        return this.http.post('https://nurse/login', data);
    }

    getToken() : string | null {
        return localStorage.getItem(this.token);
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null; // Si hay token, está autenticado
      }

    logout() {
        localStorage.removeItem(this.token);
        this.router.navigate(['/login']);
    }
}