import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list';

@Component({
  selector: 'app-root',
  standalone: true, // il faut mettre standalone: true si c'est un composant standalone
  imports: [RouterOutlet, TicketListComponent], // c'est correct
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // <-- correction : styleUrls (pluriel)
})
export class App {
  protected readonly title = signal('tickets-app');
}
