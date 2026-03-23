import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Habitacion } from '../models/interfaces';
import { environment } from '../../environment/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    private apiURL = environment.apiBaseUrl;

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
        return this.http.get<Habitacion>(this.apiURL.concat(`/rooms/show?hab_id=${room_id}`), { headers: this.getHeaders() }).pipe(
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

    assign(roomId: string, patientId: string,hab_obs: string): Observable<any> {
        return this.http.post(
            this.apiURL.concat(`/rooms/${roomId}/assign`),
            { patientId, hab_obs },
            {
                headers: this.getHeaders()
            }
        ).pipe(
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

    discharge(roomId: string): Observable<any> {
        return this.http
            .put(
                this.apiURL.concat(`/rooms/${roomId}/discharge`),
                {},
                {
                    headers: this.getHeaders()
                }
            )
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
        getAvailablePatients(): Observable<any[]> {
  return this.http.get<any[]>(
    this.apiURL.concat('/pacientes/available'),
    { headers: this.getHeaders() }
  );
}
}