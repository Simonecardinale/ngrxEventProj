import { Routes } from '@angular/router';
import EventiComponent from './pages/eventi/eventi.component';

export const routes: Routes = [
  { path: 'eventi', loadComponent: () => import("./pages/eventi/eventi.component") },
  { path: 'prenotazioni', loadComponent: () => import("./pages/prenotazioni/prenotazioni.component") },
  {path: "", redirectTo: "eventi", pathMatch: "full"},
  {path: "**", redirectTo: "eventi", pathMatch: "full"}
];
