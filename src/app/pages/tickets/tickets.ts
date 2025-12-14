import { Component } from '@angular/core';
import { TicketListComponent } from "../../components/ticket-list/ticket-list";

@Component({
  selector: 'app-tickets',
  imports: [TicketListComponent ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {

}
