import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ProduitService } from '../../../services/produit';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-produit.html',
  styleUrl: './details-produit.css'
})
export class DetailsProduit implements OnInit {

  produit = signal<Produit | null>(null);

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduit(id);
  }

  getProduit(id: number): void {
    this.produitService.getProduit(id).subscribe({
      next: (response: any) => {
        this.produit.set(response.data ?? response);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert('Impossible de récupérer les détails du produit.');
      }
    });
  }

  fermer(): void {
    this.router.navigate(['/liste-produits']);   // adapte au chemin de ta route
  }
}
