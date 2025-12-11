import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// CORRECTION DU CHEMIN : Pointe vers le fichier 'ticket-list.ts'
import { TicketListComponent } from './ticket-list/ticket-list'; 

@Component({
  selector: 'app-root',
  // Ajout de TicketListComponent dans le tableau des imports
  imports: [RouterOutlet, TicketListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tickets-app');
}
