import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://127.0.0.1:8000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  getAuths() {
    return this.http.get(`${this.api}`);
  }

  ajouterAuth(data: any) {
    return this.http.post(`${this.api}`, data);
  }

  modifierAuth(id: number, data: any) {
    return this.http.put(`${this.api}${id}`, data);
  }

  getAuth(id: number) {
    return this.http.get(`${this.api}${id}`);
  }

  supprimerAuth(id: number) {
    return this.http.delete(`${this.api}${id}`);
  }
}