import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-austritte-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './austritte-vorschau.component.html'
})
export class AustritteVorschauComponent {
  @Output() neu      = new EventEmitter<void>();
  @Output() anzeigen = new EventEmitter<void>();
}