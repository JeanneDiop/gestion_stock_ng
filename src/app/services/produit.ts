import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {


  private api = 'http://127.0.0.1:8000/api';


  constructor(private http: HttpClient) {}


  // Liste des produits
  getProduits() {

    return this.http.get<any>(
      `${this.api}/produits/lister`
    );

  }


  // Ajouter produit
  ajouterProduit(data: any) {

    return this.http.post(
      `${this.api}/ajouter/produit`,
      data
    );

  }


  // Détails d'un produit
  getProduit(id: number) {

    return this.http.get<any>(
      `${this.api}/produit/${id}`
    );

  }


  // Modifier produit
  modifierProduit(id: number, data: any) {

    return this.http.put(
      `${this.api}/produit/edit/${id}`,
      data
    );

  }


  // Supprimer produit
  supprimerProduit(id: number) {

    return this.http.delete(
      `${this.api}/produit/supprimer/${id}`
    );

  }

}