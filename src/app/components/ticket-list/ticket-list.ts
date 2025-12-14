import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket';
import { TicketFormComponent } from '../ticket-form/ticket-form';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketFormComponent],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  isLoading: boolean = false;

  searchKeyword: string = '';
  filterStatus: 'NOUVEAU' | 'EN_COURS' | 'RESOLU' | '' = '';
  filterPriority: 'URGENT' | 'MOYEN' | 'FAIBLE' | '' = '';

  selectedTicket?: Ticket;       // Ticket en cours de modification
  showUpdateForm: boolean = false; // Contrôle l'affichage du formulaire

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // Charger tous les tickets
  loadTickets(): void {
    this.isLoading = true;
    this.ticketService.getAll().subscribe({
      next: (data) => {
        this.tickets = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur récupération tickets', err);
        this.isLoading = false;
      }
    });
  }

  // Ajouter un ticket depuis le formulaire
  addedTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
    this.applyFilters();
  }

  // Ouvrir le formulaire pour modifier un ticket
  editTicket(ticket: Ticket) {
    this.selectedTicket = { ...ticket }; // copie pour ne pas modifier directement
    this.showUpdateForm = true;
  }

  // Mettre à jour le ticket
  updateTicket() {
    if (!this.selectedTicket?.id) return;

    this.ticketService.update(this.selectedTicket.id, this.selectedTicket).subscribe({
      next: (updated) => {
        const index = this.tickets.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          this.tickets[index] = updated;
          this.applyFilters();
        }
        this.selectedTicket = undefined; // fermer le formulaire
        this.showUpdateForm = false;
      },
      error: (err) => console.error('Erreur mise à jour ticket', err)
    });
  }

  // Annuler la modification
  cancelUpdate() {
    this.selectedTicket = undefined;
    this.showUpdateForm = false;
  }

  // Supprimer un ticket
  deleteTicket(id: number | undefined): void {
    if (!id) return;
    const index = this.tickets.findIndex(t => t.id === id);
    if (index === -1) return;

    this.ticketService.delete(id).subscribe({
      next: () => {
        this.tickets.splice(index, 1);
        this.applyFilters();
      },
      error: (err) => console.error('Erreur suppression ticket', err)
    });
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.filteredTickets = this.tickets.filter(ticket => {
      const matchesKeyword = ticket.titre?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ?? false;
      const matchesStatus = this.filterStatus ? ticket.statut === this.filterStatus : true;
      const matchesPriority = this.filterPriority ? ticket.priorite === this.filterPriority : true;
      return matchesKeyword && matchesStatus && matchesPriority;
    });
  }

  // Styles pour badges et lignes
  getPriorityClass(priorite?: 'URGENT' | 'MOYEN' | 'FAIBLE'): string {
    switch (priorite) {
      case 'URGENT': return 'urgent';
      case 'MOYEN': return 'moyen';
      case 'FAIBLE': return 'faible';
      default: return '';
    }
  }

  getStatusClass(statut?: 'NOUVEAU' | 'EN_COURS' | 'RESOLU'): string {
    switch (statut) {
      case 'NOUVEAU': return 'ouvert';
      case 'EN_COURS': return 'en-cours';
      case 'RESOLU': return 'ferme';
      default: return '';
    }
  }

  getRowPriorityClass(priorite?: 'URGENT' | 'MOYEN' | 'FAIBLE'): string {
    switch (priorite) {
      case 'URGENT': return 'priority-urgent';
      case 'MOYEN': return 'priority-moyen';
      case 'FAIBLE': return 'priority-faible';
      default: return '';
    }
  }

}
