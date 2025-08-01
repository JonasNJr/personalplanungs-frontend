import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitarbeiterService, Mitarbeiter } from '../../services/mitarbeiter.service';
import { Bereich, Mengenabhaengigkeit, Arbeitsverhaeltnis } from '../../enums/enums';

@Component({
  selector: 'app-personalentwicklung-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalentwicklung-view.component.html',
  styleUrls: ['./personalentwicklung-view.component.css']
})
export class PersonalentwicklungViewComponent implements OnInit {
  monate: string[] = [];
  data: any = {};

  constructor(private mitSvc: MitarbeiterService) {}

  ngOnInit(): void {
    this.buildMonate();
    this.loadData();
  }

  buildMonate() {
    // 12 Monate ab aktuellem Monat
    const now = new Date();
    this.monate = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return d.toLocaleString('de-DE', { month: 'short' }) + ' ' + String(d.getFullYear()).slice(-2);
    });
  }

  loadData() {
    const n = this.monate.length;
    this.data = {
      // --- DIREKTE ---
      direktStammKopf:     Array(n).fill(0),
      direktStammFte:      Array(n).fill(0),
      direktBefrKopf:      Array(n).fill(0),
      direktBefrFte:       Array(n).fill(0),
      direktUeberKopf:     Array(n).fill(0), // Überbrücker
      direktUeberFte:      Array(n).fill(0),
      direktSumKopf:       Array(n).fill(0),
      direktSumFte:        Array(n).fill(0),

      // --- INDIREKT mengenunabhängig ---
      indirektMuStammKopf: Array(n).fill(0),
      indirektMuStammFte:  Array(n).fill(0),
      indirektMuBefrKopf:  Array(n).fill(0),
      indirektMuBefrFte:   Array(n).fill(0),
      indirektMuSumKopf:   Array(n).fill(0),
      indirektMuSumFte:    Array(n).fill(0),

      // --- INDIREKT mengenabhängig ---
      indirektMaStammKopf: Array(n).fill(0),
      indirektMaStammFte:  Array(n).fill(0),
      indirektMaBefrKopf:  Array(n).fill(0),
      indirektMaBefrFte:   Array(n).fill(0),
      indirektMaSumKopf:   Array(n).fill(0),
      indirektMaSumFte:    Array(n).fill(0),

      // --- INDIREKT gesamt ---
      indirektGesKopf:     Array(n).fill(0),
      indirektGesFte:      Array(n).fill(0),

      // --- GESAMT OHNE AZUBIS ---
      gesStammKopf:        Array(n).fill(0),
      gesStammFte:         Array(n).fill(0),
      gesBefrUeberKopf:    Array(n).fill(0),
      gesBefrUeberFte:     Array(n).fill(0),
      gesSumKopf:          Array(n).fill(0),
      gesSumFte:           Array(n).fill(0),

      // --- SONSTIGE BELEG. ---
      azubiKopf:           Array(n).fill(0),
      azubiFte:            Array(n).fill(0),
      stammInklAzubiKopf:  Array(n).fill(0),
      stammInklAzubiFte:   Array(n).fill(0),
      befrInklUeberKopf:   Array(n).fill(0),
      befrInklUeberFte:    Array(n).fill(0),
      inaktiveKopf:        Array(n).fill(0),
      inaktiveFte:         Array(n).fill(0),
      studMitKopf:         Array(n).fill(0),
      studMitFte:          Array(n).fill(0),
      atzFreistKopf:       Array(n).fill(0),
      atzFreistFte:        Array(n).fill(0),

      // --- IST Gesamt ---
      gesamtKopf:          Array(n).fill(0),
      gesamtFte:           Array(n).fill(0),
    };

    this.mitSvc.getAlle().subscribe(list => {
      for (let i = 0; i < n; i++) {
        const now = new Date();
        const stichtag = new Date(now.getFullYear(), now.getMonth() + i + 1, 0);

        // Helper für Filter:
        const lebendig = (m: Mitarbeiter) =>
          new Date(m.eintrittsdatum) <= stichtag &&
          (!m.kuendigung || new Date(m.kuendigung) > stichtag);

        // --- DIREKTE ---
        const direktStamm = list.filter(m =>
          m.bereich === Bereich.Direkt &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Unbefristet &&
          lebendig(m)
        );
        const direktBefr = list.filter(m =>
          m.bereich === Bereich.Direkt &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Befristet &&
          lebendig(m)
        );
        // Überbrücker – Funktion enthält "Überbrück" (kannst du anpassen)
        const direktUeber = list.filter(m =>
          m.bereich === Bereich.Direkt &&
          m.funktion && m.funktion.toLowerCase().includes('überbrück') &&
          lebendig(m)
        );

        this.data.direktStammKopf[i] = direktStamm.length;
        this.data.direktStammFte[i]  = direktStamm.reduce((s, m) => s + m.fte, 0);
        this.data.direktBefrKopf[i]  = direktBefr.length;
        this.data.direktBefrFte[i]   = direktBefr.reduce((s, m) => s + m.fte, 0);
        this.data.direktUeberKopf[i] = direktUeber.length;
        this.data.direktUeberFte[i]  = direktUeber.reduce((s, m) => s + m.fte, 0);
        this.data.direktSumKopf[i]   = direktStamm.length + direktBefr.length + direktUeber.length;
        this.data.direktSumFte[i]    = this.data.direktStammFte[i] + this.data.direktBefrFte[i] + this.data.direktUeberFte[i];

        // --- INDIREKT mengenunabhängig ---
        const muStamm = list.filter(m =>
          m.bereich === Bereich.Indirekt &&
          m.mengenabhaengigkeit === Mengenabhaengigkeit.Mengenunabhaengig &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Unbefristet &&
          lebendig(m)
        );
        const muBefr = list.filter(m =>
          m.bereich === Bereich.Indirekt &&
          m.mengenabhaengigkeit === Mengenabhaengigkeit.Mengenunabhaengig &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Befristet &&
          lebendig(m)
        );
        this.data.indirektMuStammKopf[i] = muStamm.length;
        this.data.indirektMuStammFte[i]  = muStamm.reduce((s, m) => s + m.fte, 0);
        this.data.indirektMuBefrKopf[i]  = muBefr.length;
        this.data.indirektMuBefrFte[i]   = muBefr.reduce((s, m) => s + m.fte, 0);
        this.data.indirektMuSumKopf[i]   = muStamm.length + muBefr.length;
        this.data.indirektMuSumFte[i]    = this.data.indirektMuStammFte[i] + this.data.indirektMuBefrFte[i];

        // --- INDIREKT mengenabhängig ---
        const maStamm = list.filter(m =>
          m.bereich === Bereich.Indirekt &&
          m.mengenabhaengigkeit === Mengenabhaengigkeit.Mengenabhaengig &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Unbefristet &&
          lebendig(m)
        );
        const maBefr = list.filter(m =>
          m.bereich === Bereich.Indirekt &&
          m.mengenabhaengigkeit === Mengenabhaengigkeit.Mengenabhaengig &&
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Befristet &&
          lebendig(m)
        );
        this.data.indirektMaStammKopf[i] = maStamm.length;
        this.data.indirektMaStammFte[i]  = maStamm.reduce((s, m) => s + m.fte, 0);
        this.data.indirektMaBefrKopf[i]  = maBefr.length;
        this.data.indirektMaBefrFte[i]   = maBefr.reduce((s, m) => s + m.fte, 0);
        this.data.indirektMaSumKopf[i]   = maStamm.length + maBefr.length;
        this.data.indirektMaSumFte[i]    = this.data.indirektMaStammFte[i] + this.data.indirektMaBefrFte[i];

        // --- INDIREKT Gesamt ---
        this.data.indirektGesKopf[i] = this.data.indirektMuSumKopf[i] + this.data.indirektMaSumKopf[i];
        this.data.indirektGesFte[i]  = this.data.indirektMuSumFte[i] + this.data.indirektMaSumFte[i];

        // --- GESAMT OHNE AZUBIS (nur Beispiel, anpassen falls gewünscht) ---
        this.data.gesStammKopf[i] = this.data.direktStammKopf[i] + this.data.indirektMuStammKopf[i] + this.data.indirektMaStammKopf[i];
        this.data.gesStammFte[i]  = this.data.direktStammFte[i] + this.data.indirektMuStammFte[i] + this.data.indirektMaStammFte[i];
        // "Befristete exkl. Überbrücker" = alle Befristeten (direkt/indirekt), die keine Überbrücker sind
        const alleBefristetenOhneUeber = list.filter(m =>
          m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Befristet &&
          (!m.funktion || !m.funktion.toLowerCase().includes('überbrück')) &&
          lebendig(m)
        );
        this.data.gesBefrUeberKopf[i] = alleBefristetenOhneUeber.length;
        this.data.gesBefrUeberFte[i]  = alleBefristetenOhneUeber.reduce((s, m) => s + m.fte, 0);
        this.data.gesSumKopf[i] = this.data.gesStammKopf[i] + this.data.gesBefrUeberKopf[i];
        this.data.gesSumFte[i]  = this.data.gesStammFte[i] + this.data.gesBefrUeberFte[i];

        // --- SONSTIGE BELEGSCHAFT ---
        // Azubis: Funktion enthält "azubi"
        const azubis = list.filter(m =>
          m.funktion && m.funktion.toLowerCase().includes('azubi') && lebendig(m)
        );
        this.data.azubiKopf[i] = azubis.length;
        this.data.azubiFte[i]  = azubis.reduce((s, m) => s + m.fte, 0);
        // Stamm inkl. Azubis: alle unbefristet + azubis
        const stammInklAzubi = list.filter(m =>
          (m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Unbefristet ||
            (m.funktion && m.funktion.toLowerCase().includes('azubi')))
          && lebendig(m)
        );
        this.data.stammInklAzubiKopf[i] = stammInklAzubi.length;
        this.data.stammInklAzubiFte[i]  = stammInklAzubi.reduce((s, m) => s + m.fte, 0);

        // Befristete inkl. Überbrücker
        const befrInklUeber = list.filter(m =>
          (m.arbeitsverhaeltnis === Arbeitsverhaeltnis.Befristet ||
            (m.funktion && m.funktion.toLowerCase().includes('überbrück')))
          && lebendig(m)
        );
        this.data.befrInklUeberKopf[i] = befrInklUeber.length;
        this.data.befrInklUeberFte[i]  = befrInklUeber.reduce((s, m) => s + m.fte, 0);

        // Inaktive, Studentische Mitarbeiter, ATZ Freistellung – Placeholder (kannst du nach Belieben filtern!)
        this.data.inaktiveKopf[i] = 0;
        this.data.inaktiveFte[i]  = 0;
        this.data.studMitKopf[i]  = 0;
        this.data.studMitFte[i]   = 0;
        this.data.atzFreistKopf[i] = 0;
        this.data.atzFreistFte[i] = 0;

        // --- IST GESAMT ---
        this.data.gesamtKopf[i] =
          this.data.stammInklAzubiKopf[i] + this.data.befrInklUeberKopf[i] +
          this.data.inaktiveKopf[i] + this.data.studMitKopf[i] + this.data.atzFreistKopf[i];
        this.data.gesamtFte[i] =
          this.data.stammInklAzubiFte[i] + this.data.befrInklUeberFte[i] +
          this.data.inaktiveFte[i] + this.data.studMitFte[i] + this.data.atzFreistFte[i];
      }
    });
  }
}
