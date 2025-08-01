import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fluktuation-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fluktuation-vorschau.component.html'
})
export class FluktuationVorschauComponent {
  @Output() anzeigen  = new EventEmitter<void>();
}
