// src/app/ticket-list/ticket-list.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- NOUVELLE IMPORTATION

@Component({
  selector: 'app-ticket-list',
  standalone: true, 
  // AJOUT DE CommonModule (pour *ngFor, *ngIf, et autres)
  imports: [CommonModule], 
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css' // Le CSS sera correctement chargé une fois l'erreur corrigée
})
export class TicketListComponent {
  // ... Le reste de votre classe
}
