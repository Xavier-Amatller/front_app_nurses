import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    private apiURL = 'http://127.0.0.1:8000/api';

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    private getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    private getHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        });
    }

    getRooms(page: number = 1, limit: number = 4) {
        return this.http.get(this.apiURL.concat(`/rooms?page=${page}&limit=${limit}`), { headers: this.getHeaders() }).pipe(
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

    getRoom(room_id: string) {
        return this.http.get(this.apiURL.concat(`/rooms/show/?id=${room_id}`), { headers: this.getHeaders() }).pipe(
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
