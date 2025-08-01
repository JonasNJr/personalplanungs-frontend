// src/app/components/mitarbeiter-liste/mitarbeiter-liste.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitarbeiterService, Mitarbeiter } from '../../services/mitarbeiter.service';
import { MitarbeiterFormularComponent } from '../mitarbeiter-formular/mitarbeiter-formular.component';
import { MitarbeiterDetailComponent } from '../mitarbeiter-detail/mitarbeiter-detail.component';

@Component({
  selector: 'app-mitarbeiter-liste',
  standalone: true,
  imports: [
    CommonModule,
    MitarbeiterFormularComponent,
    MitarbeiterDetailComponent
  ],
  templateUrl: './mitarbeiter-liste.component.html',
  styleUrls: ['./mitarbeiter-liste.component.css']
})
export class MitarbeiterListeComponent implements OnInit {
  mitarbeiter: Mitarbeiter[]           = [];
  zeigeFormular = false;
  bearbeiteterMitarbeiter: Mitarbeiter | null = null;
  zeigeDetail    = false;
  ausgewaehlterMitarbeiter: Mitarbeiter | null = null;
  editHerkunft: 'liste' | 'detail' | null = null;

  constructor(private service: MitarbeiterService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.service.getAlle().subscribe({
      next: daten => this.mitarbeiter = daten,
      error: err => console.error('Fehler beim Laden der Mitarbeiterliste:', err)
    });
  }

  mitarbeiterAngeklickt(m: Mitarbeiter) {
    this.ausgewaehlterMitarbeiter = m;
    this.zeigeDetail = true;
  }

  zurueckZurListe() {
    this.zeigeDetail = false;
    this.ausgewaehlterMitarbeiter = null;
  }

  bearbeite(m: Mitarbeiter) {
    this.bearbeiteterMitarbeiter = m;
    this.zeigeFormular = true;
    this.zeigeDetail    = false;
    this.editHerkunft   = this.ausgewaehlterMitarbeiter ? 'detail' : 'liste';
  }

  neuerMitarbeiter() {
    this.bearbeiteterMitarbeiter = null;
    this.zeigeFormular = true;
    this.editHerkunft  = 'liste';
  }

  abbrechen() {
    this.zeigeFormular = false;
    if (this.editHerkunft === 'detail') {
      this.zeigeDetail = true;
    }
    this.editHerkunft = null;
    this.bearbeiteterMitarbeiter = null;
  }

  speichernMitarbeiter(m: Mitarbeiter) {
  console.log('Update:', m);
  if (this.bearbeiteterMitarbeiter) {
    // --- Update ---
    this.service.updateMitarbeiter(m).subscribe({
      next: () => {
        // Nach Update: Neu laden, weil Backend keine Daten zurückgibt
        this.service.getAlle().subscribe({
          next: (daten) => {
            this.mitarbeiter = daten;
            // Jetzt passenden Mitarbeiter suchen
            const neuerAkt = daten.find(x => x && x.id === m.id);
            this.ausgewaehlterMitarbeiter = neuerAkt || null;
            this.zeigeFormular = false;
            this.zeigeDetail = true;
            this.editHerkunft = null;
            this.bearbeiteterMitarbeiter = null;
          },
          error: err => console.error('Fehler beim Neuladen:', err)
        });
      },
      error: err => console.error('PUT fehlgeschlagen:', err)
    });
  } else {
    // --- Create-Fall wie gehabt ---
    this.service.addMitarbeiter(m).subscribe({
      next: neuer => {
        this.mitarbeiter.push(neuer);
        this.zeigeFormular = false;
        this.ausgewaehlterMitarbeiter = neuer;
        this.zeigeDetail = true;
        this.editHerkunft = null;
      },
      error: err => console.error('POST fehlgeschlagen:', err)
    });
  }
}

}
