import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';
import { UtilisateurService, Utilisateur } from '../../services/user';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-form.html',
  styleUrls: ['./ticket-form.css']
})
export class TicketFormComponent {
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

  constructor(
    private ticketService: TicketService,
    private utilisateurService: UtilisateurService
  ) {}
ngOnInit(): void {
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Erreur récupération des utilisateurs', err)
    });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addTicket(form: any): void {
    if (form.invalid || !this.assigneAId) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const selectedUser = this.users.find(u => u.id == this.assigneAId)!;
    this.ticket.assigneA = { id: selectedUser.id};
console.log(this.ticket);
    this.ticketService.create(this.ticket).subscribe({
      next: () => {
        alert('Ticket ajouté avec succès !');
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
