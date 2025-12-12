import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../services/ticket';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
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

  // Méthode pour déterminer la classe CSS de la priorité
  getPriorityClass(priorite?: 'HAUTE' | 'MOYENNE' | 'BASSE'): string {
    switch (priorite) {
      case 'HAUTE': return 'urgent';
      case 'MOYENNE': return 'moyen';
      case 'BASSE': return 'faible';
      default: return '';
    }
  }

  // Méthode pour déterminer la classe CSS du statut
  getStatusClass(statut?: 'OUVERT' | 'EN_COURS' | 'FERME'): string {
    switch (statut) {
      case 'OUVERT': return 'ouvert';
      case 'EN_COURS': return 'en-cours';
      case 'FERME': return 'ferme';
      default: return '';
    }
  }
}
