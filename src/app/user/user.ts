import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService, Utilisateur } from '../services/user';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserAddComponent {
  user: Utilisateur = { nom: '', email: '' };
  showForm = false;

  constructor(private userService: UtilisateurService) {}

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addUser(form: any): void {
    // Vérifie si le formulaire est valide
    if (form.invalid) {
      return; // Arrête l'ajout si les champs requis sont vides
    }

    this.userService.addUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.user = { nom: '', email: '' };
        form.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'ajout de l\'utilisateur.');
      }
    });
  }
}
