import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
private apiUrl = environment.apiBaseUrl;


    constructor(private http: HttpClient) {}
    
    createPatient(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/pacientes`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    getPatient(pac_id: string) {
      console.log(pac_id);
        return this.http.get(this.apiUrl.concat(`/pacientes/${pac_id}/show`), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    updatePatient(pac_id: string, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/pacientes/${pac_id}`, data, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
      });
  }
}
