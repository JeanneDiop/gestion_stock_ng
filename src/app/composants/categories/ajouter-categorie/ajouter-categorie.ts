import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CategorieService } from '../../../services/categorie';

@Component({
  selector: 'app-ajouter-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-categorie.html',
  styleUrl: './ajouter-categorie.css'
})
export class AjouterCategorie {

  categorie = {
     id: null as number | null,
    nom: '',
    description: ''
    
  };

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ajouterCategorie(): void {

    this.categorieService.ajouterCategorie(this.categorie).subscribe({

      next: (response: any) => {

        console.log("Categorie ajouté :", response);

        alert("Categorie ajouté avec succès !");

        // Redirection vers la liste des categories
        this.router.navigate(['/ListeCategories']);

      },

      error: (err) => {

        console.error(err);

        alert("Erreur lors de l'ajout du categorie.");

      }

    });

  }

}