import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Chamado>{
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }


  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(formData: FormData): Observable<Chamado>{
    // Crie um cabeçalho para o objeto JSON
    const headers = new HttpHeaders();
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, formData, { headers });
  }

  update(id: BigInteger,formData: FormData): Observable<Chamado>{
    const headers = new HttpHeaders();
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`, formData, { headers });
  }
}
