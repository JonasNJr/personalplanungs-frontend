import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kapazitaetsabweichung-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kapazitaetsabweichung-vorschau.component.html',
  styleUrls: ['./kapazitaetsabweichung-vorschau.component.css']
})
export class KapazitaetsabweichungVorschauComponent {
  /** öffnet das Formular zum Hinzufügen */
  @Output() neu      = new EventEmitter<void>();
  /** lädt die Auswertungstabelle */
  @Output() anzeigen = new EventEmitter<void>();
  /** lädt die 24-Monats-Forecast-Ansicht */
  @Output() forecast = new EventEmitter<void>();
}
