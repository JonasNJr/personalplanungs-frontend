import type { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MitarbeiterListeComponent } from './components/mitarbeiter-liste/mitarbeiter-liste.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },        // ← Root‑Route
  { path: 'mitarbeiter', component: MitarbeiterListeComponent }
];
