// src/app/pages/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KapazitaetsabweichungVorschauComponent } from '../../components/vorschau-kacheln/kapazitaetsabweichung-vorschau.component';
import { BefristungVorschauComponent }            from '../../components/vorschau-kacheln/befristung-vorschau.component';
import { FluktuationVorschauComponent }           from '../../components/vorschau-kacheln/fluktuation-vorschau.component';
import { PersonalentwicklungVorschauComponent }    from '../../components/vorschau-kacheln/personalentwicklung-vorschau.component';
import { AtzVorschauComponent }                   from '../../components/vorschau-kacheln/atz-vorschau.component';
import { AustritteVorschauComponent }             from '../../components/vorschau-kacheln/austritte-vorschau.component';
import { MitarbeiterVorschauComponent }           from '../../components/mitarbeiter-vorschau/mitarbeiter-vorschau.component';
import { MitarbeiterListeComponent }              from '../../components/mitarbeiter-liste/mitarbeiter-liste.component';

import { KapazitaetsabweichungFormularComponent } from '../../components/kapazitaetsabweichung-formular/kapazitaetsabweichung-formular.component';
import { AtzFormularComponent, AtzPayload }       from '../../components/atz-formular/atz-formular.component';
import { BefristungFormularComponent, BefristungPayload } from '../../components/befristung-formular/befristung-formular.component';
import { AustrittFormularComponent, AustrittPayload } from '../../components/austritt-formular/austritt-formular.component';
import { DashboardAnalyticsComponent }            from '../../components/dashboard-analytics/dashboard-analytics.component';
import { PersonalentwicklungViewComponent } from '../../components/personalentwicklung-view/personalentwicklung-view.component';


import {
  KapazitaetsabweichungService,
  Kapazitaetsabweichung
} from '../../services/kapazitaetsabweichung.service';
import { MitarbeiterService }                      from '../../services/mitarbeiter.service';
import { Austrittsart, Arbeitsverhaeltnis }        from '../../enums/enums';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // Vorschau-Kacheln
    KapazitaetsabweichungVorschauComponent,
    BefristungVorschauComponent,
    FluktuationVorschauComponent,
    PersonalentwicklungVorschauComponent,
    AtzVorschauComponent,
    AustritteVorschauComponent,

    // Mitarbeiter-Bereich
    MitarbeiterVorschauComponent,
    MitarbeiterListeComponent,

    // Formular-Components
    KapazitaetsabweichungFormularComponent,
    AtzFormularComponent,
    BefristungFormularComponent,
    AustrittFormularComponent,

    // Analytics-View
    DashboardAnalyticsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // steuert alle Modals
  showListModal = false;
  showKapForm   = false;
  showAtzForm   = false;
  showBefForm   = false;
  showAustForm  = false;

  // welche Tabelle in der großen Kachel angezeigt wird
  aktuelleTabelle: string | null = null;

  // Pseudo-Fullscreen-Zustand
  isExpanded = false;

  constructor(
    private kapSvc: KapazitaetsabweichungService,
    private mitSvc: MitarbeiterService
  ) {}

  // Auswahl der Analytics-Tabelle
  zeige(name: string) {
    this.aktuelleTabelle = name;
    this.isExpanded = false;
  }

  // Mitarbeiter-Modal
  openList()  { this.showListModal = true; }
  closeList() { this.showListModal = false; }

  // Kapazitäts-abweichungs-Formular
  openKapForm()  { this.showKapForm = true; }
  closeKapForm() { this.showKapForm = false; }
  onSaveKap(data: Kapazitaetsabweichung) {
    this.kapSvc.create(data).subscribe({
      next: () => {
        this.closeKapForm();
        this.zeige('kapazitaet');
      },
      error: err => alert('Speichern Abweichung fehlgeschlagen: ' + err)
    });
  }

  // Altersteilzeit-Formular
  openAtzForm()  { this.showAtzForm = true; }
  closeAtzForm() { this.showAtzForm = false; }
  onSaveAtz(payload: AtzPayload) {
    this.mitSvc.getById(payload.mitarbeiterId).subscribe({
      next: mit => {
        mit.kuendigung = payload.enddatum;
        mit.austritt  = Austrittsart.Altersteilzeit;
        this.mitSvc.updateMitarbeiter(mit).subscribe({
          next: () => {
            const abw = {
              mitarbeiterId:  payload.mitarbeiterId,
              startdatum:     payload.startdatum,
              enddatum:       payload.enddatum,
              neueKapazitaet: payload.neueKapazitaet,
              bemerkung:      'Altersteilzeit'
            } as Kapazitaetsabweichung;
            this.kapSvc.create(abw).subscribe({
              next: () => {
                this.closeAtzForm();
                this.zeige('kapazitaet');
              },
              error: e => alert('Abweichung ATZ fehlgeschlagen: ' + e)
            });
          },
          error: e => alert('Update Mitarbeiter ATZ fehlgeschlagen: ' + e)
        });
      },
      error: e => alert('Mitarbeiter nicht gefunden: ' + e)
    });
  }

  // Befristung-Formular
  openBefForm()  { console.log('openBefForm ▶ showBefForm wird gesetzt'); this.showBefForm = true; }
  closeBefForm() { this.showBefForm = false; }
  onSaveBef(payload: BefristungPayload) {
    this.mitSvc.getById(payload.mitarbeiterId).subscribe({
      next: mit => {
        mit.befristung         = payload.enddatum;
        mit.arbeitsverhaeltnis = Arbeitsverhaeltnis.Befristet;
        this.mitSvc.updateMitarbeiter(mit).subscribe({
          next: () => {
            this.closeBefForm();
            this.zeige('befristet');
          },
          error: err => alert('Update Befristung fehlgeschlagen: ' + err)
        });
      },
      error: err => alert('Mitarbeiter nicht gefunden: ' + err)
    });
  }

   /** Neuer Austritt */
  openAustForm()  { this.showAustForm = true; }
  closeAustForm() { this.showAustForm = false; }

  onSaveAust(payload: AustrittPayload) {
    this.mitSvc.getById(payload.mitarbeiterId).subscribe(m => {
      m.kuendigung = payload.enddatum;
      m.austritt   = payload.austrittsart;
      delete (m as any).enddatum; // Quickfix
      console.log('Wird gespeichert:', m);
      this.mitSvc.updateMitarbeiter(m).subscribe(() => {
        this.closeAustForm();
        this.zeige('austritte');
      });
    });
  }

  // Pseudo-Fullscreen toggeln
  toggleExpand() {
    if (this.aktuelleTabelle) {
      this.isExpanded = !this.isExpanded;
    }
  }
}
