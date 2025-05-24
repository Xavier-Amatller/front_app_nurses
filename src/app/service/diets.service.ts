import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class DietsService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    getOptions() {
        return this.http.get('http://127.0.0.1:8000/api/dieta/options', { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
        return this.http.get('http://127.0.0.1:8000/api/dieta/' + dietId, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
        return this.http.get('http://127.0.0.1:8000/api/dieta/history/' + pac_id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } }).pipe(
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
                'http://127.0.0.1:8000/api/dieta/new',
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
