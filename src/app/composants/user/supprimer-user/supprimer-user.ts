import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-supprimer-user',
  standalone: true,
  imports: [],
  templateUrl: './supprimer-user.html',
  styleUrl: './supprimer-user.css'
})
export class SupprimerUser {

 @Input() user: User | null = null;

  @Output() fermerModal = new EventEmitter<void>();

  @Output() suppressionReussie = new EventEmitter<void>();

  envoiEnCours = signal(false);
  erreur = signal('');

  constructor(private userService: UserService) {}

  // Fermer la fenêtre
  fermer(): void {
    if (!this.envoiEnCours()) {
      this.fermerModal.emit();
    }
  }

  // Confirmer la suppression
  confirmerSuppression(): void {

    if (!this.user?.id) {
      this.erreur.set('Identifiant de l’utilisateur introuvable.');
      return;
    }

    this.envoiEnCours.set(true);
    this.erreur.set('');

    this.userService.supprimerUser(this.user.id).subscribe({

      next: (response) => {

        console.log('Utilisateur supprimé avec succès', response);

        this.envoiEnCours.set(false);

        this.suppressionReussie.emit();

        this.fermerModal.emit();

      },

      error: (error) => {

        console.error('Erreur de suppression :', error);

        this.envoiEnCours.set(false);

        this.erreur.set(
          error.error?.message || 'Impossible de supprimer cet utilisateur.'
        );

      }

    });

  }

}
