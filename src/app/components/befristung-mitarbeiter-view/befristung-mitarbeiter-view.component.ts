// src/app/components/befristung-mitarbeiter-view/befristung-mitarbeiter-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { Observable }        from 'rxjs';

import {
  MitarbeiterService,
  Mitarbeiter
} from '../../services/mitarbeiter.service';
import {
  BefristungPayload,
  BefristungFormularComponent
} from '../befristung-formular/befristung-formular.component';
import { Arbeitsverhaeltnis } from '../../enums/enums';

@Component({
  selector: 'app-befristung-mitarbeiter-view',
  standalone: true,
  imports: [CommonModule, FormsModule, BefristungFormularComponent],
  templateUrl: './befristung-mitarbeiter-view.component.html',
  styleUrls: ['./befristung-mitarbeiter-view.component.css']
})
export class BefristungMitarbeiterViewComponent implements OnInit {
  mitarbeiter: Mitarbeiter[] = [];
  filterName      = '';
  filterAbteilung = '';
  abteilungen:    string[] = [];

  // für Bearbeiten
  editing?: BefristungPayload;

  constructor(private mitSvc: MitarbeiterService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.mitSvc.getBefristete().subscribe(list => {
      this.mitarbeiter = list;
      this.abteilungen = Array.from(
        new Set(list.map(m => m.abteilung))
      ).sort();
    });
  }

  onFilter() {
    this.mitSvc.getBefristete().subscribe(list => {
      this.mitarbeiter = list
        .filter(m =>
          !this.filterName ||
          `${m.vorname} ${m.name}`.toLowerCase()
            .includes(this.filterName.toLowerCase())
        )
        .filter(m =>
          !this.filterAbteilung ||
          m.abteilung === this.filterAbteilung
        );
    });
  }

  /** Löscht die Befristung: Datum entfernen + Arbeitsverhältnis zurücksetzen */
  onDelete(id: number) {
    if (!confirm('Befristung wirklich entfernen?')) return;
    this.mitSvc.getById(id).subscribe(m => {
      m.befristung = null;
      m.arbeitsverhaeltnis = Arbeitsverhaeltnis.Unbefristet;
      this.mitSvc.updateMitarbeiter(m).subscribe(() => this.loadAll());
    });
  }

  /** Öffnet das Formular zum Bearbeiten einer bestehenden Befristung */
  onEdit(m: Mitarbeiter) {
    if (!m.befristung) return;
    this.editing = { mitarbeiterId: m.id, enddatum: m.befristung };
  }

  /** Wird aufgerufen, wenn das Bearbeitungs-Formular speichert */
  onSaveEdit(payload: BefristungPayload) {
    this.mitSvc.getById(payload.mitarbeiterId).subscribe(m => {
      m.befristung = payload.enddatum;
      m.arbeitsverhaeltnis = Arbeitsverhaeltnis.Befristet;
      this.mitSvc.updateMitarbeiter(m).subscribe(() => {
        this.loadAll();
      });
    });
  }

  /** Abbrechen im Bearbeitungs-Formular */
  onCancelEdit() {
    this.editing = undefined;
  }
}
