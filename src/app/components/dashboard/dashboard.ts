import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Sidebar } from "../sidebar/sidebar";
import { TicketListComponent } from "../ticket-list/ticket-list";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [Sidebar, TicketListComponent]
})
export class DashboardComponent implements AfterViewInit {

  totalTickets = 50;
  openTickets = 20;
  resolvedTickets = 30;

  ngAfterViewInit(): void {
    new Chart('ticketsStatusChart', {
      type: 'doughnut',
      data: {
        labels: ['Ouverts', 'Résolus'],
        datasets: [{
          data: [this.openTickets, this.resolvedTickets],
          backgroundColor: ['#3498db', '#2ecc71']
        }]
      }
    });

    new Chart('ticketsPriorityChart', {
      type: 'bar',
      data: {
        labels: ['Urgent', 'Moyen', 'Faible'],
        datasets: [{
          label: 'Nombre de tickets',
          data: [10, 25, 15],
          backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71']
        }]
      }
    });
  }
}
