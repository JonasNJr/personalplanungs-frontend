import { Component, OnInit }       from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';

import {
  MitarbeiterService,
  Mitarbeiter
} from '../../services/mitarbeiter.service';

@Component({
  selector: 'app-atz-mitarbeiter-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atz-mitarbeiter-view.component.html',
  styleUrls: ['./atz-mitarbeiter-view.component.css']
})
export class AtzMitarbeiterViewComponent implements OnInit {
  mitarbeiter: Mitarbeiter[] = [];
  filterName      = '';
  filterAbteilung = '';
  abteilungen:    string[] = [];

  constructor(private mitSvc: MitarbeiterService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  /** holt alle ATZ‐Mitarbeiter und füllt das Abteilungs‐Dropdown */
  private loadAll(): void {
    this.mitSvc.getATZler().subscribe(list => {
      this.mitarbeiter  = list;
      this.abteilungen  = Array.from(
        new Set(list.map(m => m.abteilung))
      ).sort();
    });
  }

  /** Filtert lokal nach Name und Abteilung */
  onFilter(): void {
    this.mitSvc.getATZler().subscribe(list => {
      this.mitarbeiter = list
        .filter(m =>
          !this.filterName ||
          `${m.vorname} ${m.name}`
            .toLowerCase()
            .includes(this.filterName.toLowerCase())
        )
        .filter(m =>
          !this.filterAbteilung ||
          m.abteilung === this.filterAbteilung
        );
    });
  }
}
