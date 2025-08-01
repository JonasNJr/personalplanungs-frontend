import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalentwicklung-vorschau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personalentwicklung-vorschau.component.html'
})
export class PersonalentwicklungVorschauComponent {
   @Output() anzeigen = new EventEmitter<void>();
}
