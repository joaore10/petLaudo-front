import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Clinica } from '../models/clinica';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Clinica>{
    return this.http.get<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${id}`);
  }

  findAll(): Observable<Clinica[]>{
    return this.http.get<Clinica[]>(`${API_CONFIG.baseUrl}/clinicas`);
  }

  create(cliente: Clinica): Observable<Clinica> {
    return this.http.post<Clinica>(`${API_CONFIG.baseUrl}/clinicas`, cliente);
  }

  update(cliente: Clinica): Observable<Clinica>{
    return this.http.put<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<Clinica> {
    return this.http.delete<Clinica>(`${API_CONFIG.baseUrl}/clinicas/${id}`);
  }
}
