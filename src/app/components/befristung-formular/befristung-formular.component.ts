// src/app/components/befristung-formular/befristung-formular.component.ts
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

import { Mitarbeiter, MitarbeiterService } from '../../services/mitarbeiter.service';

export interface BefristungPayload {
  mitarbeiterId: number;
  enddatum:      string; // yyyy-MM-dd
}

@Component({
  selector: 'app-befristung-formular',
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
  templateUrl: './befristung-formular.component.html',
  styleUrls: ['./befristung-formular.component.css']
})
export class BefristungFormularComponent implements OnInit {
  /** Daten, mit denen das Formular vorbefüllt wird (für Edit) */
  @Input() data: BefristungPayload = {
    mitarbeiterId: 0,
    enddatum:      ''
  };

  @Output() speichern = new EventEmitter<BefristungPayload>();
  @Output() abbrechen = new EventEmitter<void>();

  mitarbeiterCtrl = new FormControl<string | Mitarbeiter>('');
  gefilterteMitarbeiter!: Observable<Mitarbeiter[]>;
  alleMitarbeiter: Mitarbeiter[] = [];

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

      // Falls data vorbelegt wurde, setze den Autocomplete-Wert
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
      alert('Bitte ein Befristungsdatum eingeben.');
      return;
    }
    this.speichern.emit({
      mitarbeiterId: (mit as Mitarbeiter).id,
      enddatum:      this.data.enddatum
    });
  }
}
