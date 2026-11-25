import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FournisseurService } from '../../../services/fournisseur';
import { Fournisseur } from '../../../models/fournisseur';

@Component({
  selector: 'app-liste-fournisseurs',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './liste-fournisseur.html',
  styleUrl: './liste-fournisseur.css'
})
export class ListeFournisseurs implements OnInit {

  fournisseurs: Fournisseur[] = [];

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.chargerFournisseurs();
  }

  // Charger la liste des fournisseurs
  chargerFournisseurs(): void {

    this.fournisseurService.getFournisseurs().subscribe({

      next: (response: any) => {

        console.log('Réponse API :', response);

        this.fournisseurs = response.data ?? response;

        console.log('Liste des fournisseurs :', this.fournisseurs);

      },

      error: (err) => {

        console.error(
          'Erreur lors du chargement des fournisseurs :',
          err
        );

      }

    });

  }

  // Supprimer un fournisseur
  supprimerFournisseur(id: number): void {

    if (confirm('Voulez-vous vraiment supprimer ce fournisseur ?')) {

      this.fournisseurService.supprimerFournisseur(id).subscribe({

        next: () => {

          alert('Fournisseur supprimé avec succès !');

          this.chargerFournisseurs();

        },

        error: (err) => {

          console.error('Erreur lors de la suppression :', err);

          alert('Erreur lors de la suppression du fournisseur.');

        }

      });

    }

  }

}
