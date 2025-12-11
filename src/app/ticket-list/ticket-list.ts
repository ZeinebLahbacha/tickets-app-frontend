import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAll().subscribe(data => {
      this.tickets = data;
    });
  }
}
