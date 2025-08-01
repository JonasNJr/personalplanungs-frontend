import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mitarbeiter } from '../../services/mitarbeiter.service';

@Component({
  selector: 'app-mitarbeiter-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mitarbeiter-detail.component.html',
  styleUrls: ['./mitarbeiter-detail.component.css']
})
export class MitarbeiterDetailComponent {
  @Input() daten!: Mitarbeiter;
  @Output() zurueck = new EventEmitter<void>();
  @Output() bearbeiten = new EventEmitter<Mitarbeiter>();
}
