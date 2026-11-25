
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';
import { ClientSupprimerComponent } from '../supprimer-client/supprimer-client';

@Component({
  selector: 'app-liste-clients',
  standalone: true,
  imports: [
    RouterLink,
    ClientSupprimerComponent
  ],
  templateUrl: './liste-client.html',
  styleUrl: './liste-client.css'
})
export class ListeClients implements OnInit {

  clients = signal<Client[]>([]);

  // Client sélectionné pour la suppression
  clientASupprimer = signal<Client | null>(null);

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.chargerClients();
  }

  // Charger la liste des clients
  chargerClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: any) => {
        const donnees = response.data ?? response;
        this.clients.set(Array.isArray(donnees) ? donnees : []);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients :', err);
        this.clients.set([]);
      }
    });
  }

  // Ouvrir la fenêtre de suppression
  ouvrirModalSuppression(client: Client): void {
    this.clientASupprimer.set(client);
  }

  // Fermer la fenêtre de suppression
  fermerModal(): void {
    this.clientASupprimer.set(null);
  }

}
