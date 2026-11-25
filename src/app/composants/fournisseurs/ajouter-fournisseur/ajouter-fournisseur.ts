import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { FournisseurService } from '../../../services/fournisseur';

@Component({
  selector: 'app-ajouter-fournisseur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ajouter-fournisseur.html',
  styleUrl: './ajouter-fournisseur.css'
})
export class AjouterFournisseur {

  fournisseur = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    nom_entreprise: '',
    genre: '',
    adresse: '',
    site_web: '',
    statut: 'Actif'
  };

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ajouterFournisseur() {

    this.fournisseurService.ajouterFournisseur(this.fournisseur).subscribe({
      next: (response) => {
        console.log('Fournisseur ajouté avec succès', response);
        this.router.navigate(['/ListeFournisseurs']);
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout du fournisseur', error);
      }
    });

  }
}