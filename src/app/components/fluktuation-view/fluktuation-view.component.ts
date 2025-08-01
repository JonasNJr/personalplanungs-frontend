import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MitarbeiterService, Mitarbeiter } from '../../services/mitarbeiter.service';
import { Austrittsart } from '../../enums/enums';

interface MonatStat {
  agK: number; // ArbeitgeberKündigung
  anK: number; // ArbeitnehmerKündigung
  sonst: number;
  gesMA: number;
  fluktuation: number; // in %
}

@Component({
  selector: 'app-fluktuation-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fluktuation-view.component.html',
  styleUrls: ['./fluktuation-view.component.css']
})
export class FluktuationMitarbeiterViewComponent implements OnInit {
  jahr = new Date().getFullYear();
  jahre: number[] = [];
  monate = [
    'Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
  ];
  stats: MonatStat[] = [];

  constructor(private mitSvc: MitarbeiterService) {}

  ngOnInit(): void {
    const thisYear = new Date().getFullYear();
    this.jahre = Array.from({length: 5}, (_, i) => thisYear + i);
    this.loadData(this.jahr);  // Nur hier aufrufen!
  }

  loadData(jahr: number) {
    this.mitSvc.getAlle().subscribe(list => {
      this.stats = [];
      for (let monat = 1; monat <= 12; monat++) {
        // Kündigungen in diesem Monat/Jahr
        const agK = list.filter(m =>
          m.kuendigung &&
          m.austritt === Austrittsart.ArbeitgeberKündigung &&
          new Date(m.kuendigung).getFullYear() === jahr &&
          new Date(m.kuendigung).getMonth() + 1 === monat
        ).length;

        const anK = list.filter(m =>
          m.kuendigung &&
          m.austritt === Austrittsart.ArbeitnehmerKündigung &&
          new Date(m.kuendigung).getFullYear() === jahr &&
          new Date(m.kuendigung).getMonth() + 1 === monat
        ).length;

        const sonst = list.filter(m =>
          m.kuendigung &&
          m.austritt === Austrittsart.Sonstiges &&
          new Date(m.kuendigung).getFullYear() === jahr &&
          new Date(m.kuendigung).getMonth() + 1 === monat
        ).length;

        // Stichtag = letzter Tag des Monats
        const letzterTag = new Date(jahr, monat, 0);
        const gesMA = list.filter(m =>
          new Date(m.eintrittsdatum) <= letzterTag &&
          (!m.kuendigung || new Date(m.kuendigung) > letzterTag)
        ).length;

        const fluktuation = gesMA === 0 ? 0 : ((agK + anK + sonst) / gesMA) * 100;

        this.stats.push({ agK, anK, sonst, gesMA, fluktuation });
      }
    });
  }
}

