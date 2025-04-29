import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
    private token = 'authToken';
    private auxIdKey = 'auxId';

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) { }

    login(aux_num_trabajador: string, aux_password: string): Observable<any> {
        let data = {
            'aux_num_trabajador': aux_num_trabajador,
            'aux_password': aux_password
        }
        return this.http.post('http://127.0.0.1:8000/api/login', data, {
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    getToken(): string | null {
        return localStorage.getItem(this.token);
    }

    setToken(token: string) {
        localStorage.setItem("authToken", token)
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    logout() {
        localStorage.removeItem(this.token);
        this.router.navigate(['/login']);
    }

    setAuxiliarId(auxId: string): void {
        localStorage.setItem(this.auxIdKey, auxId);
        console.log(localStorage.getItem(this.auxIdKey));
    }

    getAuxiliarId(): string | null {
        return localStorage.getItem(this.auxIdKey);
    }
}