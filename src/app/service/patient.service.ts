import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = 'http://127.0.0.1:8000/api';

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

    updatePatient(pacId: string, data: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/pacientes/${pacId}`, data, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
      });
  }
}
