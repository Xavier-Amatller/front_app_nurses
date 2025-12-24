import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  createAuxiliar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auxiliares`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  findAuxiliar(auxNumTrabajador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auxiliares/${auxNumTrabajador}/show`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  updateAuxiliar(auxNumTrabajador: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/auxiliares`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}