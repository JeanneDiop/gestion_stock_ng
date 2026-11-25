
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { SupprimerUser } from '../supprimer-user/supprimer-user';

@Component({
  selector: 'app-liste-user',
  standalone: true,
  imports: [RouterLink, SupprimerUser],
  templateUrl: './liste-user.html',
  styleUrl: './liste-user.css'
})
export class ListeUser implements OnInit {

  users = signal<User[]>([]);
  chargement = signal(false);

  // Suppression
  userSelectionnePourSuppression = signal<User | null>(null);

  // Réinitialisation du mot de passe
  userAReinitialiser = signal<User | null>(null);
  motDePasseParDefaut = 'ADMIN';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.chargerUsers();
  }

  // Charger les utilisateurs
  chargerUsers(): void {
    this.chargement.set(true);

    this.userService.getUsers().subscribe({
      next: (response: any) => {
        const donnees = response.data ?? response;
        this.users.set(Array.isArray(donnees) ? donnees : []);
        this.chargement.set(false);
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement :', err);
        this.users.set([]);
        this.chargement.set(false);
      }
    });
  }

  // Ouvrir la fenêtre de suppression
  ouvrirSuppression(user: User): void {
    this.userSelectionnePourSuppression.set(user);
  }

  // Fermer la fenêtre de suppression
  fermerSuppression(): void {
    this.userSelectionnePourSuppression.set(null);
  }

  // Après une suppression réussie
  apresSuppression(): void {
    this.userSelectionnePourSuppression.set(null);
    this.chargerUsers();
  }

  // Ouvrir la fenêtre de réinitialisation
  ouvrirModalReset(user: User): void {
    this.userAReinitialiser.set(user);
  }

  // Fermer la fenêtre de réinitialisation
  fermerModalReset(): void {
    this.userAReinitialiser.set(null);
  }

  // Confirmer la réinitialisation
  confirmerReset(): void {
    const user = this.userAReinitialiser();

    if (!user || user.id === undefined) return;

    this.userService.reinitialiserMotDePasse(user.id).subscribe({
      next: () => {
        this.fermerModalReset();
        alert('Mot de passe réinitialisé avec succès');
      },
      error: (err: any) => {
        console.error('Erreur lors de la réinitialisation :', err);
        this.fermerModalReset();
        alert('Erreur lors de la réinitialisation du mot de passe');
      }
    });
  }
}
