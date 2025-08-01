import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitarbeiterService, Mitarbeiter } from '../../services/mitarbeiter.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mitarbeiter-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mitarbeiter-vorschau.component.html',
  styleUrls: ['./mitarbeiter-vorschau.component.css']
})
export class MitarbeiterVorschauComponent implements OnInit {
  mitarbeiterListe: Mitarbeiter[] = [];

  @Output() listeAnzeigen = new EventEmitter<void>();

  constructor(private mitarbeiterService: MitarbeiterService) {}

  ngOnInit(): void {
    this.mitarbeiterService.getAlle().subscribe({
      next: (daten) => this.mitarbeiterListe = daten.slice(0, 11),
      error: (err) => console.error('Fehler beim Laden der Mitarbeiter:', err)
    });
  }
}