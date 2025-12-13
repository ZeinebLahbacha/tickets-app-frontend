import { Component } from '@angular/core';
import { TicketListComponent } from "../../components/ticket-list/ticket-list";
import { TicketFormComponent } from '../../components/ticket-form/ticket-form';

@Component({
  selector: 'app-tickets',
  imports: [TicketListComponent ,TicketFormComponent],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {

}
