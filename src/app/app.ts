import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list';
import { UserAddComponent } from './user/user';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, TicketListComponent , UserAddComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected readonly title = signal('tickets-app');
}
