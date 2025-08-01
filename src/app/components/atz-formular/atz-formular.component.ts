// src/app/components/atz-formular/atz-formular.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule }         from '@angular/forms';
import { Observable, map, startWith }               from 'rxjs';
import { CommonModule }                             from '@angular/common';
import { FormsModule }                              from '@angular/forms';

import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatAutocompleteModule }    from '@angular/material/autocomplete';
import { MatOptionModule }          from '@angular/material/core';
import { MatButtonModule }          from '@angular/material/button';

import {
  Mitarbeiter,
  MitarbeiterService
} from '../../services/mitarbeiter.service';

export interface AtzPayload {
  mitarbeiterId:  number;
  startdatum:     string;  // YYYY-MM-DD
  enddatum:       string;  // YYYY-MM-DD
  neueKapazitaet: number;
}

@Component({
  selector: 'app-atz-formular',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './atz-formular.component.html',
  styleUrls: ['./atz-formular.component.css']
})
export class AtzFormularComponent implements OnInit {
  @Output() speichern = new EventEmitter<AtzPayload>();
  @Output() abbrechen = new EventEmitter<void>();

  mitarbeiterCtrl = new FormControl<string | Mitarbeiter>('');
  gefilterteMitarbeiter!: Observable<Mitarbeiter[]>;
  alleMitarbeiter: Mitarbeiter[] = [];

  data: AtzPayload = {
    mitarbeiterId:  0,
    startdatum:     new Date().toISOString().slice(0,10),
    enddatum:       '',
    neueKapazitaet: 1.0
  };

  constructor(private mitService: MitarbeiterService) {}

  ngOnInit() {
    this.mitService.getAlle().subscribe(list => {
      this.alleMitarbeiter = list;
      this.gefilterteMitarbeiter = this.mitarbeiterCtrl.valueChanges.pipe(
        startWith(''),
        map(val => {
          const name = val == null
            ? ''
            : typeof val === 'string'
              ? val
              : `${val.vorname} ${val.name}`;
          const filter = name.toLowerCase();
          return filter
            ? this.alleMitarbeiter.filter(m =>
                (`${m.vorname} ${m.name}`)
                  .toLowerCase()
                  .includes(filter)
              )
            : this.alleMitarbeiter.slice();
        })
      );
    });
  }

  displayFn(m: Mitarbeiter | string | null): string {
    return m && typeof m !== 'string' ? `${m.vorname} ${m.name}` : '';
  }

  onSubmit() {
    console.log('ATZ-Form submitted:', this.data, this.mitarbeiterCtrl.value);
    const m = this.mitarbeiterCtrl.value;
    if (!m || typeof m === 'string') {
      alert('Bitte einen Mitarbeiter auswählen.');
      return;
    }
    if (!this.data.startdatum || !this.data.enddatum) {
      alert('Bitte Start- und Enddatum eingeben.');
      return;
    }
    if (this.data.neueKapazitaet == null) {
      alert('Bitte Kapazität angeben.');
      return;
    }
    this.speichern.emit({
      mitarbeiterId:  (m as Mitarbeiter).id,
      startdatum:     this.data.startdatum,
      enddatum:       this.data.enddatum,
      neueKapazitaet: this.data.neueKapazitaet
    });
  }
}
