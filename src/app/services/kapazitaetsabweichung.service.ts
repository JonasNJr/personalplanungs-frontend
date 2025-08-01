import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';

export interface Kapazitaetsabweichung {
  id: number;
  mitarbeiterId: number;
  startdatum: string;
  enddatum: string;
  neueKapazitaet: number;
  bemerkung?: string;
}

@Injectable({ providedIn: 'root' })
export class KapazitaetsabweichungService {
  private apiUrl = 'https://localhost:7054/api/kapazitaetsabweichung';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Kapazitaetsabweichung[]> {
    return this.http.get<Kapazitaetsabweichung[]>(this.apiUrl);
  }
  getById(id: number): Observable<Kapazitaetsabweichung> {
    return this.http.get<Kapazitaetsabweichung>(`${this.apiUrl}/${id}`);
  }
  create(abw: Omit<Kapazitaetsabweichung, 'id'>):
      Observable<Kapazitaetsabweichung> {
    return this.http.post<Kapazitaetsabweichung>(this.apiUrl, abw);
  }
  update(abw: Kapazitaetsabweichung):
      Observable<Kapazitaetsabweichung> {
    return this.http.put<Kapazitaetsabweichung>(
      `${this.apiUrl}/${abw.id}`, abw
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
