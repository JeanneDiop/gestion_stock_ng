import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-modifier-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-user.html',
  styleUrl: './modifier-user.css',
})
export class ModifierUser implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() id!: number;

  user: User = {
    id: 0,
    nom: '',
    prenom: '',
    genre: 'Homme',
    telephone: '',
    email: '',
    username: '',
    adresse: '',
    role_nom: '',
    etat: 'actif',
  };

  chargement = signal(false);
  envoiEnCours = signal(false);
  erreur = signal('');
  succes = signal('');
  userConnecte: any;
  idUserConnect: any;
  subjectUserConnect: any;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.subjectUserConnect = localStorage.getItem('user');
    this.idUserConnect = JSON.parse(this.subjectUserConnect || '{}').id;
    // console.log(this.subjectUserConnect);

    if (this.id) {
      this.chargerUser();
    } else {
      this.erreur.set("Identifiant de l'utilisateur introuvable.");
    }
  }

  // Charger les informations de l'utilisateur
  chargerUser(): void {
    this.chargement.set(true);
    this.erreur.set('');

    this.userService.getUser(this.id).subscribe({
      next: (response: any) => {
        const data = response.data ?? response;

        this.user = {
          ...this.user,
          ...data,
        };

        this.chargement.set(false);
      },

      error: (error) => {
        console.error(error);
        this.erreur.set("Impossible de charger les informations de l'utilisateur.");
        this.chargement.set(false);
      },
    });
  }

  // Modifier l'utilisateur
  modifierUser(): void {
    if (!this.user.id) {
      this.erreur.set("Identifiant de l'utilisateur introuvable.");
      return;
    }

    this.erreur.set('');
    this.succes.set('');
    this.envoiEnCours.set(true);
    this.userService.modifierUser(this.user.id, this.user).subscribe({
      next: () => {
        this.succes.set('Utilisateur modifié avec succès !');
        this.envoiEnCours.set(false);

        this.router.navigate(['/ListeUtilisateurs']);
      },

      error: (error) => {
        console.log('Erreur complète :', error);
        console.log('Code HTTP :', error.status);
        console.log('Message Laravel :', error.error);

        let message = "Erreur lors de la modification de l'utilisateur.";

        if (error.status === 422 && error.error?.errors) {
          // Erreurs de validation Laravel : tous les champs en cause
          message = Object.values(error.error.errors).flat().join(' ');
        } else if (error.error?.status_message) {
          message = error.error.status_message;
        } else if (error.error?.message) {
          message = error.error.message;
        }

        this.erreur.set(message);
        this.envoiEnCours.set(false);
      },
    });
  }

  // Annuler la modification
  annuler(): void {
    this.router.navigate(['/ListeUtilisateurs']);
  }
}
