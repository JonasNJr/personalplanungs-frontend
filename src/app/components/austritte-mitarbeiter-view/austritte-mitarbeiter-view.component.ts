import { Component, OnInit }       from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';

import {
  Mitarbeiter,
  MitarbeiterService
} from '../../services/mitarbeiter.service';

import {
  AustrittPayload,
  AustrittFormularComponent
} from '../austritt-formular/austritt-formular.component';
import { Austrittsart } from '../../enums/enums';

@Component({
  selector: 'app-austritte-mitarbeiter-view',
  standalone: true,
  imports: [CommonModule, FormsModule, AustrittFormularComponent],
  templateUrl: './austritte-mitarbeiter-view.component.html',
  styleUrls: ['./austritte-mitarbeiter-view.component.css']
})
export class AustritteMitarbeiterViewComponent implements OnInit {
  mitarbeiter: Mitarbeiter[] = [];
  filterName      = '';
  filterAbteilung = '';
  abteilungen:    string[] = [];

  /** Wenn nicht-undefined: Formular öffnet sich als Modal */
  editing?: AustrittPayload;

  constructor(private mitSvc: MitarbeiterService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.mitSvc.getAlle().subscribe(list => {
      // nur mit Datum
      const aust = list.filter(m => !!m.kuendigung);
      this.mitarbeiter = aust;
      this.abteilungen = Array.from(new Set(aust.map(m => m.abteilung))).sort();
    });
  }

  onFilter() {
    this.mitSvc.getAlle().subscribe(list => {
      let aust = list.filter(m => !!m.kuendigung);
      if (this.filterName) {
        aust = aust.filter(m =>
          (`${m.vorname} ${m.name}`)
            .toLowerCase()
            .includes(this.filterName.toLowerCase())
        );
      }
      if (this.filterAbteilung) {
        aust = aust.filter(m => m.abteilung === this.filterAbteilung);
      }
      this.mitarbeiter = aust;
    });
  }

  onDelete(id: number) {
    if (!confirm('Wirklich Austritt entfernen?')) return;
    this.mitSvc.getById(id).subscribe(m => {
      m.kuendigung = null;
      m.austritt   = Austrittsart.KeineAngabe;
      this.mitSvc.updateMitarbeiter(m).subscribe(() => this.loadAll());
    });
  }

  onEdit(m: Mitarbeiter) {
    if (!m.kuendigung) return;
    this.editing = {
      mitarbeiterId: m.id,
      enddatum:      m.kuendigung!,
      austrittsart:  m.austritt
    };
  }

  onSaveEdit(payload: AustrittPayload) {
    this.mitSvc.getById(payload.mitarbeiterId).subscribe(m => {
      m.kuendigung = payload.enddatum;
      m.austritt   = payload.austrittsart;
      this.mitSvc.updateMitarbeiter(m).subscribe(() => {
        this.editing = undefined;
        this.loadAll();
      });
    });
  }

  onCancelEdit() {
    this.editing = undefined;
  }
}
