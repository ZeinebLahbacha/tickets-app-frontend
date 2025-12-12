import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../services/ticket';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule], // plus besoin de HttpClientModule
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    console.log('ngOnInit appelé');
    this.ticketService.getAll().subscribe({
      next: (data) => {
        console.log('Tickets reçus :', data);
        this.tickets = data;
      },
      error: (err) => console.error('Erreur récupération tickets', err)
    });
  }
}
