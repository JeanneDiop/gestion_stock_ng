import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../services/produit';
import { Produit } from '../../../models/produit';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css'
})
export class ListeProduits implements OnInit {

  produits = signal<Produit[]>([]);

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (response: any) => {
        this.produits.set(response.data ?? response);
        console.log('Liste des produits :', this.produits());
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }
}
