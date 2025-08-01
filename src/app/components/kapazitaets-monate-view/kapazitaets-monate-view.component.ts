import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { forkJoin }          from 'rxjs';

import {
  MitarbeiterService,
  Mitarbeiter
} from '../../services/mitarbeiter.service';
import { Bereich } from '../../enums/enums';

interface Row {
  mitarbeiter: Mitarbeiter;
  ftes: number[];            // 24 Werte pro Monat
}
interface DeptGroup {
  abteilung: string;
  rows: Row[];
  sumFte: number[];          // Summe FTE pro Monat
  headsPerMonth: number[];   // Köpfe pro Monat
}

@Component({
  selector: 'app-kapazitaets-monate-view',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './kapazitaets-monate-view.component.html',
  styleUrls: ['./kapazitaets-monate-view.component.css']
})
export class KapazitaetsMonateViewComponent implements OnInit {
  months: string[]      = [];   // Labels "MM/YYYY"
  private originalGroups: DeptGroup[] = [];
  filteredGroups: DeptGroup[] = [];

  bereichFilter: 'all' | Bereich = 'all';
  bereicheEnum = Object.values(Bereich);

  abteilungen: string[] = [];
  deptFilter = '';

  constructor(private svcM: MitarbeiterService) {}

  ngOnInit() {
    this.buildMonths();

    // 1) alle Mitarbeiter laden
    this.svcM.getAlle().subscribe(mitarbeiter => {
      // 2) für jeden Mitarbeiter den 24-Monats-Forecast holen
      const calls = mitarbeiter.map(m =>
        this.svcM.getForecastMonate(m.id)
      );

      // 3) warten, bis alle Forecast-Calls zurück sind
      forkJoin(calls).subscribe(allForecasts => {
        // allForecasts: number[][], jedes Element ein 24-Werte-Array

        // 4) Rows mit fertigen ftes befüllen
        const rows: Row[] = mitarbeiter.map((m, i) => ({
          mitarbeiter: m,
          ftes: allForecasts[i]
        }));

        // 5) Gruppieren
        this.originalGroups = this.createDeptGroups(rows);

        // 6) Abteilungs-Dropdown füllen
        this.abteilungen = Array.from(
          new Set(this.originalGroups.map(g => g.abteilung))
        ).sort();

        // 7) initial filtern
        this.updateFiltered();
      });
    });
  }

  /** Gruppiert bereits fertige Rows nach Abteilung und berechnet Summe + Köpfe */
  private createDeptGroups(rows: Row[]): DeptGroup[] {
    const map = new Map<string, Row[]>();
    for (const r of rows) {
      const key = r.mitarbeiter.abteilung;
      let grpRows = map.get(key);
    if (!grpRows) {
      grpRows = [];
      map.set(key, grpRows);
    }
    grpRows.push(r);
    }

    return Array.from(map.entries()).map(([abt, grpRows]) => {
      const sumFte = this.months.map((_, i) =>
        grpRows.reduce((s, r) => s + r.ftes[i], 0)
      );
      const headsPerMonth = this.months.map((_, i) =>
        grpRows.filter(r => r.ftes[i] > 0).length
      );
      return { abteilung: abt, rows: grpRows, sumFte, headsPerMonth };
    });
  }

  /** Baut das 24-Monats-Array "MM/YYYY" */
  private buildMonths() {
    const now = new Date();
    this.months = Array.from({ length: 24 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return `${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    });
  }

  /** Wendet Bereichs- und Abteilungs-Filter an */
  updateFiltered() {
    this.filteredGroups = this.originalGroups
      .filter(g => !this.deptFilter || g.abteilung === this.deptFilter)
      .map(g => {
        const rows = g.rows.filter(r =>
          this.bereichFilter === 'all' ||
          r.mitarbeiter.bereich === this.bereichFilter
        );
        const sumFte = this.months.map((_, i) =>
          rows.reduce((s, r) => s + r.ftes[i], 0)
        );
        const headsPerMonth = this.months.map((_, i) =>
          rows.filter(r => r.ftes[i] > 0).length
        );
        return { abteilung: g.abteilung, rows, sumFte, headsPerMonth };
      })
      .filter(g => g.rows.length > 0);
  }
}
