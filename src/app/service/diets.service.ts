import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class DietsService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    getOptions() {
        return this.http.get('http://127.0.0.1:8000/api/dieta/options', { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } });
    }
    getDiet(dietId: string) {
        return this.http.get('http://127.0.0.1:8000/api/dieta/' + dietId, { headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') } });
    }
    insertDiet(pac_id:string,textureId: string, dietTypes: Array<string>, autonomy: boolean, prosthesis: boolean, aux_number: number) {
        return this.http.post(
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
        );
    }
}
