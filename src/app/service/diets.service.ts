import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';
@Injectable()
export class DietsService {
    private apiUrl = environment.apiBaseUrl;
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    getOptions() {
        return this.http.get(`${this.apiUrl}/dieta/options`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
    getDiet(dietId: string) {
        return this.http.get(`${this.apiUrl}/dieta/` + dietId, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
    getDietsHistory(pac_id: string) {
        return this.http.get(`${this.apiUrl}/dieta/history/` + pac_id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
    insertDiet(pac_id: string, textureId: string, dietTypes: Array<string>, autonomy: boolean, prosthesis: boolean, aux_number: number) {
        return this.http
            .post(
                `${this.apiUrl}/dieta/new`,
                {
                    pac_id,
                    textureId,
                    dietTypes,
                    autonomy,
                    prosthesis,
                    aux_number
                },
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }
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
}
