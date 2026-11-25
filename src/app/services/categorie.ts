import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  private api = 'http://127.0.0.1:8000/api';


  constructor(private http: HttpClient) {}


  // Liste des categories
  getCategories() {

    return this.http.get<any>(
      `${this.api}/categorie/lister`
    );

  }


  // Ajouter categorie
  ajouterCategorie(data: any) {

    return this.http.post(
      `${this.api}/ajouter/categorie`,
      data
    );

  }


  // Détails d'un categorie
  getCategorie(id: number) {

    return this.http.get<any>(
      `${this.api}/categorie/${id}`
    );

  }


  // Modifier categorie
  modifierCategorie(id: number, data: any) {

    return this.http.put(
      `${this.api}/categorie/edit/${id}`,
      data
    );

  }


 // Supprimer catégorie
supprimerCategorie(categorie: number) {

  return this.http.delete(
    `${this.api}/categorie/supprimer/${categorie}`
  );

}

}