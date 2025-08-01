import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Arbeitsverhaeltnis,
  Bereich,
  Mengenabhaengigkeit,
  Austrittsart
} from '../enums/enums';

export interface Mitarbeiter {
  id: number;
  vorname: string;
  name: string;
  funktion: string;
  eintrittsdatum: string;
  fte: number;
  kostenstelle: string;
  abteilung: string;
  bereichsnummer: number;
  arbeitsverhaeltnis: Arbeitsverhaeltnis;
  bereich: Bereich;
  mengenabhaengigkeit: Mengenabhaengigkeit;
  austritt: Austrittsart;
  bemerkung: string;
  kuendigung: string | null;
  befristung: string | null;
  freistellung: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MitarbeiterService {
  private apiUrl = 'https://localhost:7054/api/mitarbeiter';

  constructor(private http: HttpClient) {}

  /** Liste aller Mitarbeiter */
  getAlle(): Observable<Mitarbeiter[]> {
    return this.http.get<Mitarbeiter[]>(this.apiUrl);
  }

  /** Einen einzelnen Mitarbeiter abrufen */
  getById(id: number): Observable<Mitarbeiter> {
    return this.http.get<Mitarbeiter>(`${this.apiUrl}/${id}`);
  }

  /** Neuen Mitarbeiter anlegen */
  addMitarbeiter(mitarbeiter: Mitarbeiter): Observable<Mitarbeiter> {
    return this.http.post<Mitarbeiter>(this.apiUrl, mitarbeiter);
  }

  /** Vorhandenen Mitarbeiter updaten */
  updateMitarbeiter(mitarbeiter: Mitarbeiter): Observable<Mitarbeiter> {
    return this.http.put<Mitarbeiter>(
      `${this.apiUrl}/${mitarbeiter.id}`,
      mitarbeiter
    );
  }

  /** Holt den 24-Monats‐Forecast (FTE-Werte) für einen Mitarbeiter */
  getForecastMonate(mitarbeiterId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.apiUrl}/${mitarbeiterId}/forecast/monate`
    );
  }

  /** Alle ATZ‐Mitarbeiter (Austrittsart = Altersteilzeit) */
  getATZler(): Observable<Mitarbeiter[]> {
    return this.http.get<Mitarbeiter[]>(`${this.apiUrl}/atz`);
  }

   /** Holt alle befristeten Mitarbeiter */
  getBefristete(): Observable<Mitarbeiter[]> {
    return this.http.get<Mitarbeiter[]>(`${this.apiUrl}/befristet`);
  }

}
