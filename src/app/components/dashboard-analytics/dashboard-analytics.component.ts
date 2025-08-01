import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { KapazitaetsabweichungenViewComponent }from '../kapazitaetsabweichungen-view/kapazitaetsabweichungen-view.component';
import { KapazitaetsMonateViewComponent } from '../kapazitaets-monate-view/kapazitaets-monate-view.component';
import { AtzMitarbeiterViewComponent }          from '../atz-mitarbeiter-view/atz-mitarbeiter-view.component';
import { BefristungMitarbeiterViewComponent } from '../befristung-mitarbeiter-view/befristung-mitarbeiter-view.component';
import { AustritteMitarbeiterViewComponent }    from '../austritte-mitarbeiter-view/austritte-mitarbeiter-view.component';
import { FluktuationMitarbeiterViewComponent } from '../fluktuation-view/fluktuation-view.component';
import { PersonalentwicklungViewComponent } from '../../components/personalentwicklung-view/personalentwicklung-view.component';



@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [CommonModule, 
            KapazitaetsabweichungenViewComponent,
            KapazitaetsMonateViewComponent,
            AtzMitarbeiterViewComponent,
            BefristungMitarbeiterViewComponent,
            AustritteMitarbeiterViewComponent,
            FluktuationMitarbeiterViewComponent,
            PersonalentwicklungViewComponent
  ],
  templateUrl: './dashboard-analytics.component.html',
  styleUrls:  ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent {
  @Input() inhalt: string | null = null;
}
