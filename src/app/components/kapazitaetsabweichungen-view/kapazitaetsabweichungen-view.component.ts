import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  KapazitaetsabweichungService,
  Kapazitaetsabweichung
} from '../../services/kapazitaetsabweichung.service';
import {
  MitarbeiterService,
  Mitarbeiter
} from '../../services/mitarbeiter.service';

interface AbweichungView extends Kapazitaetsabweichung {
  mitarbeiterName: string;
  abteilung: string;
}

@Component({
  selector: 'app-kapazitaetsabweichungen-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kapazitaetsabweichungen-view.component.html',
  styleUrls: ['./kapazitaetsabweichungen-view.component.css']
})
export class KapazitaetsabweichungenViewComponent implements OnInit {
  abweichungen: AbweichungView[] = [];
  filterName = '';
  filterAbteilung = '';
  filterStart?: string;
  filterEnd?: string;
  abteilungen: string[] = [];

  // für Bearbeiten
  editing?: AbweichungView;

  constructor(
    private abhSvc: KapazitaetsabweichungService,
    private mitSvc: MitarbeiterService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  /** Lädt Abweichungen plus Mitarbeiter-Daten */
  private loadAll(): void {
    forkJoin({
      abw: this.abhSvc.getAll(),
      mit: this.mitSvc.getAlle()
    }).subscribe({
      next: ({ abw, mit }) => {
        const view = abw.map(a => {
          const m = mit.find(x => x.id === a.mitarbeiterId);
          return {
            ...a,
            mitarbeiterName: m?.name ?? 'Unbekannt',
            abteilung: m?.abteilung ?? ''
          } as AbweichungView;
        });
        this.abweichungen = view;
        this.abteilungen = Array.from(new Set(view.map(v => v.abteilung))).sort();
      },
      error: err => console.error('Lade-Fehler:', err)
    });
  }

  /** Filtert lokal nach Name, Abteilung und Datumsbereich */
  onFilter(): void {
    this.abweichungen = this.abweichungen
      .filter(a => !this.filterName || a.mitarbeiterName.toLowerCase().includes(this.filterName.toLowerCase()))
      .filter(a => !this.filterAbteilung || a.abteilung === this.filterAbteilung)
      .filter(a => !this.filterStart || a.startdatum >= this.filterStart!)
      .filter(a => !this.filterEnd || a.enddatum <= this.filterEnd!);
  }

  /** Öffnet das Formular zum Anlegen einer neuen Abweichung */
  addNew(): void {
    console.log('Neue Abweichung anlegen');
  }

  /** Startet den Bearbeiten-Flow für eine bestehende Abweichung */
  onEdit(a: AbweichungView): void {
    this.editing = { ...a };
    console.log('Bearbeite Abweichung:', this.editing);
  }

  /** Löscht die Abweichung und lädt die Liste neu */
  onDelete(id: number): void {
    if (!confirm('Wirklich löschen?')) return;
    this.abhSvc.delete(id).subscribe({ next: () => this.loadAll() });
  }

  /** Wenn Bearbeitungsformular gespeichert hat */
  onSaveEdit(updated: AbweichungView): void {
    this.abhSvc.update(updated).subscribe({ next: () => { this.editing = undefined; this.loadAll(); } });
  }

  /** Abbruch beim Bearbeiten */
  onCancelEdit(): void {
    this.editing = undefined;
  }
}
