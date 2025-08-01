import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Mitarbeiter, MitarbeiterService } from '../../services/mitarbeiter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule }    from '@angular/material/core'; // für <mat-option>
import { MatButtonModule }    from '@angular/material/button';

@Component({
  selector: 'app-kapazitaetsabweichung-formular',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: './kapazitaetsabweichung-formular.component.html',
  styleUrls: ['./kapazitaetsabweichung-formular.component.css']
})
export class KapazitaetsabweichungFormularComponent implements OnInit {
  @Output() speichern = new EventEmitter<any>();
  @Output() abbrechen = new EventEmitter<void>();

  mitarbeiterCtrl = new FormControl<string | Mitarbeiter>('');
  gefilterteMitarbeiter!: Observable<Mitarbeiter[]>;

  alleMitarbeiter: Mitarbeiter[] = [];

  constructor(private mitarbeiterService: MitarbeiterService) {}

  ngOnInit() {
    this.mitarbeiterService.getAlle().subscribe(mitarbeiter => {
      this.alleMitarbeiter = mitarbeiter;
      this.gefilterteMitarbeiter = this.mitarbeiterCtrl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : (value?.vorname + ' ' + value?.name);
          return name ? this._filter(name) : this.alleMitarbeiter.slice();
        })
      );
    });
  }

  displayFn(mit: Mitarbeiter): string {
    return mit && mit.vorname ? `${mit.vorname} ${mit.name}` : '';
  }

  private _filter(name: string): Mitarbeiter[] {
    const filterValue = name.toLowerCase();
    return this.alleMitarbeiter.filter(mit =>
      (`${mit.vorname} ${mit.name}`.toLowerCase().includes(filterValue))
    );
  }

  data = {
    mitarbeiter: '',
    start: '',
    ende: '',
    kapazitaet: 1.0,
    bemerkung: ''
  };

  onSubmit() {
    const mit: Mitarbeiter | string = this.mitarbeiterCtrl.value!;
    const mitarbeiterId = typeof mit === 'object' && mit !== null ? mit.id : null;

    if (!mitarbeiterId) {
      alert('Bitte einen Mitarbeiter aus der Liste auswählen.');
      return;
    }

    const abweichung = {
      id: 0,
      mitarbeiterId,                         // camelCase!
      startdatum: this.data.start,           // camelCase!
      enddatum:   this.data.ende,            // camelCase!
      neueKapazitaet: this.data.kapazitaet,   // camelCase!
      bemerkung: this.data.bemerkung         // camelCase!
    };


    // Logging – optional
    console.log('Abweichung an Backend:', abweichung);

    this.speichern.emit(abweichung);
  }

}
