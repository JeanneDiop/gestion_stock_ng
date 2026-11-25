import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../../services/categorie';
import { Categorie } from '../../../models/categorie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-categorie',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './liste-categorie.html',
  styleUrl: './liste-categorie.css'
})
export class ListeCategories implements OnInit {

  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  // Charger la liste des catégories
  chargerCategories(): void {
    this.categorieService.getCategories().subscribe({

      next: (response: any) => {
        console.log('Réponse API :', response);

        this.categories = response.data ?? response;

        console.log('Liste des catégories :', this.categories);
      },

      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
      }

    });
  }

  // Supprimer une catégorie
  supprimerCategorie(id: number): void {

    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {

      this.categorieService.supprimerCategorie(id).subscribe({

        next: (response: any) => {
          alert('Catégorie supprimée avec succès');

          // Actualiser la liste
          this.chargerCategories();
        },

        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Erreur lors de la suppression de la catégorie');
        }

      });

    }

  }

}