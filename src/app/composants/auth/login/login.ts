
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class AuthComponent {

  loginValue: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const data = {
      login: this.loginValue,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (response: any) => {
        console.log('Connexion réussie', response);

        // Enregistrer le token JWT
        localStorage.setItem('token', response.token);

        // Enregistrer les informations de l'utilisateur
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirection vers la page d'accueil
        this.router.navigate(['/accueil']);
      },

      error: (error) => {
        console.log('Erreur connexion', error);
      }

    });
  }
}
