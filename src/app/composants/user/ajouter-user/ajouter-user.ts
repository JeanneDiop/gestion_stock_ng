import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-ajouter-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ajouter-user.html',
  styleUrl: './ajouter-user.css'
})
export class AjouterUser {

  user: User = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    genre: 'Homme',
    etat: 'actif',
    adresse: '',
    role_nom: ''
  };

  constructor(private router: Router) {}

  ajouterUser(): void {
    console.log('Utilisateur à enregistrer :', this.user);
  }

}
