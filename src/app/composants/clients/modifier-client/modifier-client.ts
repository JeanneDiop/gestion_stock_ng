
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';


@Component({
  selector: 'app-modifier-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-client.html',
  styleUrl: './modifier-client.css'
})
export class ModifierClientComponent implements OnInit {

  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() id!: number;

  client: Client = {
    id: 0,
    nom: '',
    prenom: '',
    genre: 'Homme',
    code_client: '',
    telephone: '',
    ville: '',
    pays: ''
  };

  chargement = signal(false);
  envoiEnCours = signal(false);
  erreur = signal('');
  succes = signal('');

 ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));

  if (this.id) {
    this.chargerClient();
  } else {
    this.erreur.set('Identifiant du client introuvable.');
  }
}

  chargerClient(): void {
    this.chargement.set(true);

    this.clientService.getClient(this.id).subscribe({
      next: (data: Client) => {
        this.client = { ...data };
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les informations du client.');
        this.chargement.set(false);
      }
    });
  }

  modifierClient(): void {

    if (!this.client.id) {
      this.erreur.set('Identifiant du client introuvable.');
      return;
    }

    this.erreur.set('');
    this.succes.set('');
    this.envoiEnCours.set(true);

    this.clientService.modifierClient(this.client.id, this.client).subscribe({
      next: () => {
        this.succes.set('Client modifié avec succès !');
        this.envoiEnCours.set(false);

        this.router.navigate(['/ListeClients']);
      },
      error: () => {
        this.erreur.set('Erreur lors de la modification du client.');
        this.envoiEnCours.set(false);
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/ListeClients']);
  }
}
