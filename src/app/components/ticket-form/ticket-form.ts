import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';
import { UtilisateurService, Utilisateur } from '../../services/user';
import { Ticket } from '../../models/ticket';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-form.html',
  styleUrls: ['./ticket-form.css']
})
export class TicketFormComponent {
@Output() ticketAdded = new EventEmitter<any>();


  showForm = false;

  ticket: Ticket = {
    titre: '',
    description: '',
    priorite: 'MOYEN',
    statut: 'NOUVEAU',
    assigneA: null
  };

  assigneAId: number | null = null;
  users: Utilisateur[] = [];
  priorites = ['URGENT', 'MOYEN', 'FAIBLE'] as const;
  statuts = ['NOUVEAU', 'EN_COURS', 'RESOLU'] as const;

  // 🔹 Propriétés pour filtrage
  tickets: Ticket[] = []; // tickets récupérés
  searchKeyword: string = '';
  filterPriorite: string = '';
  filterStatut: string = '';

  constructor(
    private ticketService: TicketService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    // Récupérer les utilisateurs
    this.utilisateurService.getAll().subscribe({
      next: (data) => { this.users = data; },
      error: (err) => console.error('Erreur récupération des utilisateurs', err)
    });


  }

 

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // 🔹 Méthode pour filtrer les tickets
  filteredTickets(): Ticket[] {
    return this.tickets.filter(ticket => {
      const matchKeyword = ticket.titre?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ?? false;
      const matchPriorite = this.filterPriorite ? ticket.priorite === this.filterPriorite : true;
      const matchStatut = this.filterStatut ? ticket.statut === this.filterStatut : true;
      return matchKeyword && matchPriorite && matchStatut;
    });
  }
  addItem(ticket: any): any {
    this.ticketAdded.emit(ticket);
  }

  addTicket(form: any): void {
    if (form.invalid || !this.assigneAId) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const selectedUser = this.users.find(u => u.id == this.assigneAId)!;
    this.ticket.assigneA = { id: selectedUser.id };
    console.log(this.ticket);

    this.ticketService.create(this.ticket).subscribe({
      next: () => {
       this.ticketAdded.emit(this.ticket); 

        // Réinitialiser le formulaire
        this.ticket = { titre: '', description: '', priorite: 'MOYEN', statut: 'NOUVEAU', assigneA: null };
        this.assigneAId = null;
        form.resetForm();
        this.showForm = false;

      },
      error: err => {
        console.error(err);
        alert('Erreur lors de l\'ajout du ticket.');
      }
    });
  }
}
