import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProduitService } from '../../../services/produit';

@Component({
  selector: 'app-ajouter-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-produit.html',
  styleUrl: './ajouter-produit.css'
})
export class AjouterProduit {

  produit = {
    nomproduit: '',
    description: '',
    prix: null,
    etat: '',
    categorie_id: null,
    fournisseur_id: null,
    image: null
  };

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ajouterProduit(): void {

    this.produitService.ajouterProduit(this.produit).subscribe({

      next: (response: any) => {

        console.log("Produit ajouté :", response);

        alert("Produit ajouté avec succès !");

        // Redirection vers la liste des produits
        this.router.navigate(['/ListeProduits']);

      },

      error: (err) => {

        console.error(err);

        alert("Erreur lors de l'ajout du produit.");

      }

    });

  }

}