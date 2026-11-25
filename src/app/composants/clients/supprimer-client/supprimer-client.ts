
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-supprimer',
  standalone: true,
  imports: [],
  templateUrl: './supprimer-client.html',
  styleUrl: './supprimer-client.css'
})
export class ClientSupprimerComponent {

  @Input() client!: Client;

  @Output() fermerModal = new EventEmitter<void>();

  @Output() suppressionReussie = new EventEmitter<void>();

  envoiEnCours = signal(false);
  erreur = signal('');

  constructor(private clientService: ClientService) {}

  // Fermer la fenêtre
  fermer(): void {
    if (!this.envoiEnCours()) {
      this.fermerModal.emit();
    }
  }

  // Confirmer la suppression
  confirmerSuppression(): void {

    if (!this.client?.id) {
      this.erreur.set('Identifiant du client introuvable.');
      return;
    }

    this.envoiEnCours.set(true);
    this.erreur.set('');

    this.clientService.supprimerClient(this.client.id).subscribe({

      next: (response) => {

        console.log('Client supprimé avec succès', response);

        this.envoiEnCours.set(false);

        this.suppressionReussie.emit();

        this.fermerModal.emit();

      },

      error: (error) => {

        console.error('Erreur de suppression :', error);

        this.envoiEnCours.set(false);

        this.erreur.set(
          error.error?.message || 'Impossible de supprimer ce client.'
        );

      }

    });

  }

}
