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

  downloadImagesFromBackend(imageUrls: string[]): Promise<string[]> {
    const promises: Promise<string>[] = [];

    for (const imageUrl of imageUrls) {
      const promise = new Promise<string>((resolve, reject) => {
        this.http.get(`${API_CONFIG.baseUrl}/download/${imageUrl}`, { responseType: 'blob' }).subscribe((blob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
          reader.readAsDataURL(blob);
        }, (error) => {
          reject(error);
        });
      });

      promises.push(promise);
    }

    return Promise.all(promises);
  }

  
}
