import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- importer RouterModule

@Component({
  selector: 'app-sidebar',
  standalone: true, // nécessaire si ton composant est standalone
  imports: [RouterModule], // <-- ajouter RouterModule ici
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'], // correction : styleUrls (avec un s)
})
export class Sidebar {}
