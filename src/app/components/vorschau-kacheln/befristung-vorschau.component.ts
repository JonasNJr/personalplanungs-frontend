import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-befristung-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './befristung-vorschau.component.html'
})
export class BefristungVorschauComponent {
   @Output() neu = new EventEmitter<void>();
   @Output() anzeigen = new EventEmitter<void>();
}
