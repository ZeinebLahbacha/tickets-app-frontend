import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket';

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
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.tickets = data;
      },
      error: (err) => console.error('Erreur récupération tickets', err)
    });
  }

  deleteTicket(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Voulez-vous vraiment supprimer ce ticket ?')) {
      this.ticketService.delete(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(ticket => ticket.id !== id);
        },
        error: (err) => console.error('Erreur suppression ticket', err)
      });
    }
  }

  // Badge priorité
  getPriorityClass(priorite?: 'URGENT' | 'MOYEN' | 'FAIBLE'): string {
    switch (priorite) {
      case 'URGENT': return 'urgent';
      case 'MOYEN': return 'moyen';
      case 'FAIBLE': return 'faible';
      default: return '';
    }
  }

  // Badge statut
  getStatusClass(statut?: 'NOUVEAU' | 'EN_COURS' | 'RESOLU'): string {
    switch (statut) {
      case 'NOUVEAU': return 'ouvert';
      case 'EN_COURS': return 'en-cours';
      case 'RESOLU': return 'ferme';
      default: return '';
    }
  }

  // Classe de la ligne (pour border-left + bg)
  getRowPriorityClass(priorite?: 'URGENT' | 'MOYEN' | 'FAIBLE'): string {
    switch (priorite) {
      case 'URGENT': return 'priority-urgent';
      case 'MOYEN': return 'priority-moyen';
      case 'FAIBLE': return 'priority-faible';
      default: return '';
    }
  }
}
