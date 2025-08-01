import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atz-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atz-vorschau.component.html'
})
export class AtzVorschauComponent {
  /** Neues ATZ-Formular öffnen */
  @Output() neu     = new EventEmitter<void>();
  /** ATZ-Mitarbeiterliste anzeigen */
  @Output() anzeigen = new EventEmitter<void>();
}
