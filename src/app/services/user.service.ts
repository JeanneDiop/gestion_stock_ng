import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Liste des utilisateurs
  getUsers() {
    return this.http.get<any>(`${this.api}/utilisateurs/lister`);
  }

  // Ajouter un utilisateur
  ajouterUser(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  // Détails d'un utilisateur
  getUser(id: number) {
    return this.http.get<any>(`${this.api}/utilisateur/${id}`);
  }

  // Modifier un utilisateur
  modifierUser(id: number, user: User) {
    const token = localStorage.getItem('user');

    console.log('Mon token :', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    console.log('Mes headers :', headers.get('Authorization'));
    return this.http.put(`http://localhost:8000/api/auth/utilisateur/edit/${id}`, user, {
      headers,
    });
  }

  // Supprimer un utilisateur
  supprimerUser(id: number) {
    return this.http.delete(`${this.api}/utilisateur/supprimer/${id}`);
  }

  // Réinitialiser le mot de passe d'un utilisateur
  // ATTENTION : adapte l'URL (et put/post) à ta route backend
  reinitialiserMotDePasse(id: number) {
    return this.http.put(`${this.api}/user/reset-password/${id}`, {});
  }

  getToken(): string | null {
    return localStorage.getItem('user');
  }

  // Récupérer les informations de l'utilisateur connecté
  getUserConnected(): any {
    const token: any = this.getToken();
    // const decodedToken: any = jwtDecode(token);
    return token;

    // if (!token) {
    //   return null;
    // }

    // try {
    //   const decodedToken: any = jwtDecode(token);
    //   return decodedToken;
    // } catch (error) {
    //   console.error('Erreur lors du décodage du token', error);
    //   return null;
    // }
  }

  // getUsers() {
  // return this.http.get('http://localhost:8000/api/utilisateurs/lister');
  //}

  ////getUser(id: number) {
  //return this.http.get(`http://localhost:8000/api/utilisateur/${id}`);
  //}

  //modifierUser(id: number, user: User) {
  //return this.http.put(`http://localhost:8000/api/auth/utilisateur/edit/${id}`, user);
  //}

  //supprimer(id: number) {
  // return this.http.delete(`http://localhost:8000/api/utilisateur/supprimer/${id}`);
  //}
}
