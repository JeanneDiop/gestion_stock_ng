
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class AccueilComponent {

  afficherConfirmation = false;

  constructor(private router: Router) {}

  ouvrirConfirmation(): void {
    this.afficherConfirmation = true;

  }

  annulerDeconnexion(): void {
    this.afficherConfirmation = false;
  }

  deconnexion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/']);
  }
}
