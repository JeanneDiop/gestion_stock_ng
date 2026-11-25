import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

    // Liste des clients
  getClients() {
    return this.http.get<any>(
      `${this.api}/client/lister`
    );
  }

  // Détails d'un client
  getClient(id: number) {
    return this.http.get<any>(
      `${this.api}/client/detail/${id}`
    );
  }

  // Ajouter un client
  ajouterClient(data: any) {
    return this.http.post(
      `${this.api}/client/create`,
      data
    );
  }

  // Modifier un client
  modifierClient(id: number, data: any) {
    return this.http.put(
      `${this.api}/client/edit/${id}`,
      data
    );
  }

  // Supprimer un client
  supprimerClient(id: number) {
    return this.http.delete(
      `${this.api}/client/supprimer/${id}`
    );
  }

}
