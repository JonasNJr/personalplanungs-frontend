// src/app/components/austritt-formular/austritt-formular.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule }                from '@angular/forms';
import { Observable, startWith, map }                      from 'rxjs';
import { CommonModule }                                    from '@angular/common';
import { FormsModule }                                     from '@angular/forms';

import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatAutocompleteModule }   from '@angular/material/autocomplete';
import { MatOptionModule }         from '@angular/material/core';
import { MatButtonModule }         from '@angular/material/button';
import { MatSelectModule }         from '@angular/material/select';

import {
  Mitarbeiter,
  MitarbeiterService
} from '../../services/mitarbeiter.service';
import { Austrittsart } from '../../enums/enums';

export interface AustrittPayload {
  mitarbeiterId: number;
  enddatum:      string;            // yyyy-MM-dd
  austrittsart:  Austrittsart;
}

@Component({
  selector: 'app-austritt-formular',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './austritt-formular.component.html',
  styleUrls: ['./austritt-formular.component.css']
})
export class AustrittFormularComponent implements OnInit {
  @Input() data: AustrittPayload = {
    mitarbeiterId: 0,
    enddatum:      '',
    austrittsart:  Austrittsart.KeineAngabe
  };

  @Output() speichern = new EventEmitter<AustrittPayload>();
  @Output() abbrechen = new EventEmitter<void>();

  mitarbeiterCtrl = new FormControl<string | Mitarbeiter>('');
  gefilterteMitarbeiter!: Observable<Mitarbeiter[]>;
  alleMitarbeiter: Mitarbeiter[] = [];

  austrittsArten = Object.values(Austrittsart);

  constructor(private mitService: MitarbeiterService) {}

  ngOnInit() {
    this.mitService.getAlle().subscribe(list => {
      this.alleMitarbeiter = list;
      this.gefilterteMitarbeiter = this.mitarbeiterCtrl.valueChanges.pipe(
        startWith(''),
        map(val => {
          const filterValue = val == null
            ? ''
            : typeof val === 'string'
              ? val
              : `${val.vorname} ${val.name}`;
          const filter = filterValue.toLowerCase();
          return filter
            ? this.alleMitarbeiter.filter(m =>
                (`${m.vorname} ${m.name}`)
                  .toLowerCase()
                  .includes(filter)
              )
            : this.alleMitarbeiter.slice();
        })
      );

      // Vorbefüllen beim Edit
      if (this.data.mitarbeiterId) {
        const vor = this.alleMitarbeiter.find(m => m.id === this.data.mitarbeiterId);
        if (vor) this.mitarbeiterCtrl.setValue(vor);
      }
    });
  }

  displayFn(m: Mitarbeiter): string {
    return m ? `${m.vorname} ${m.name}` : '';
  }

  onSubmit() {
    const mit = this.mitarbeiterCtrl.value;
    if (!mit || typeof mit === 'string') {
      alert('Bitte einen Mitarbeiter auswählen.');
      return;
    }
    if (!this.data.enddatum) {
      alert('Bitte ein Austrittsdatum eingeben.');
      return;
    }
    if (!this.data.austrittsart) {
      alert('Bitte eine Austrittsart auswählen.');
      return;
    }
    this.speichern.emit({
      mitarbeiterId: (mit as Mitarbeiter).id,
      enddatum:      this.data.enddatum,
      austrittsart:  this.data.austrittsart
    });
  }
}
