
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Liste des fournisseurs
  getFournisseurs() {
    return this.http.get<any>(
      `${this.api}/fournisseur/lister`
    );
  }

  // Ajouter un fournisseur
  ajouterFournisseur(data: any) {
    return this.http.post(
      `${this.api}/fournisseur/create`,
      data
    );
  }

  // Modifier un fournisseur
  modifierFournisseur(id: number, data: any) {
    return this.http.put(
      `${this.api}/fournisseur/${id}`,
      data
    );
  }

  // Récupérer un fournisseur par son ID
  getFournisseur(id: number) {
    return this.http.get<any>(
      `${this.api}/fournisseur/${id}`
    );
  }

  // Supprimer un fournisseur
  supprimerFournisseur(id: number) {
    return this.http.delete(
      `${this.api}/fournisseur/${id}`
    );
  }

}
