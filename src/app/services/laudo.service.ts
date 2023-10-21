import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Laudo } from '../models/laudo';

@Injectable({
  providedIn: 'root'
})
export class LaudoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Laudo>{
    return this.http.get<Laudo>(`${API_CONFIG.baseUrl}/laudos/${id}`);
  }


  findAll(): Observable<Laudo[]> {
    return this.http.get<Laudo[]>(`${API_CONFIG.baseUrl}/laudos`);
  }

  create(laudo: Laudo): Observable<Laudo>{
    return this.http.post<Laudo>(`${API_CONFIG.baseUrl}/laudos`, laudo);
  }

  update(laudo: Laudo): Observable<Laudo>{
    return this.http.put<Laudo>(`${API_CONFIG.baseUrl}/laudos/${laudo.id}`, laudo);
  }
}
