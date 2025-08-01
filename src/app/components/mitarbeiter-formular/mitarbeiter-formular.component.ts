// src/app/components/mitarbeiter-formular/mitarbeiter-formular.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule }                             from '@angular/common';
import { FormsModule }                              from '@angular/forms';
import { Mitarbeiter }                              from '../../services/mitarbeiter.service';
import {
  Arbeitsverhaeltnis,
  Bereich,
  Mengenabhaengigkeit,
  Austrittsart
} from '../../enums/enums';

@Component({
  selector: 'app-mitarbeiter-formular',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mitarbeiter-formular.component.html',
  styleUrls: ['./mitarbeiter-formular.component.css']
})
export class MitarbeiterFormularComponent implements OnInit {
  @Input() daten: Mitarbeiter | null = null;
  @Input() editMode = false;

  @Output() speichern = new EventEmitter<Mitarbeiter>();
  @Output() abbrechen = new EventEmitter<void>();

  neuerMitarbeiter: Mitarbeiter = {
    id:                 0,
    vorname:            '',
    name:               '',
    funktion:           '',
    eintrittsdatum:     '',
    fte:                1.0,
    kostenstelle:       '',
    abteilung:          '',
    bereichsnummer:     0,
    arbeitsverhaeltnis: Arbeitsverhaeltnis.Unbefristet,
    bereich:            Bereich.Direkt,
    mengenabhaengigkeit: Mengenabhaengigkeit.Mengenunabhaengig,
    austritt:            Austrittsart.KeineAngabe,
    bemerkung:           '',
    kuendigung:          null,
    befristung:          null,
    freistellung:        null
  };

  arbeitsverhaeltnisse = Object.values(Arbeitsverhaeltnis);
  bereiche            = Object.values(Bereich);
  mengenoptionen      = Object.values(Mengenabhaengigkeit);
  austrittsarten      = Object.values(Austrittsart);

 /** Mapping der echten Kostenstellen aus dem Backend */
  private costCenterMap: Record<string, { bereich: Bereich; bereichNummer: number; abteilung: string }> = {
    '1100': { bereich: Bereich.Direkt,   bereichNummer: 1, abteilung: 'Logistik' },
    '1200': { bereich: Bereich.Indirekt, bereichNummer: 2, abteilung: 'IT'       },
    '1300': { bereich: Bereich.Indirekt, bereichNummer: 2, abteilung: 'Personal' },
    '1400': { bereich: Bereich.Direkt,   bereichNummer: 1, abteilung: 'Produktion' },
    // … mehr einfach hier ergänzen …
  };

  /** Liste aller Kostenstellen-Keys für die datalist */
  costCenterList = Object.keys(this.costCenterMap);

  ngOnInit(): void {
    if (this.daten) {
      // Im Edit-Mode vorhandene Daten übernehmen
      this.neuerMitarbeiter = { ...this.daten };
    }
  }

  onKostenstelleChange(cc: string) {
    const meta = this.costCenterMap[cc];
    if (meta) {
      this.neuerMitarbeiter.bereich        = meta.bereich;
      this.neuerMitarbeiter.bereichsnummer  = meta.bereichNummer;
      this.neuerMitarbeiter.abteilung      = meta.abteilung;
    }
  }

  onSubmit() {
    this.onKostenstelleChange(this.neuerMitarbeiter.kostenstelle);
    this.speichern.emit(this.neuerMitarbeiter);
  }

  onAbbrechen() {
    this.abbrechen.emit();
  }
}
