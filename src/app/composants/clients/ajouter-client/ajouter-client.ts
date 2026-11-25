import { Component, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client';

// ⚠️ Mets ici la route EXACTE de ta page liste-client (celle de ton fichier de routes)
const ROUTE_LISTE = '/clients';

@Component({
  selector: 'app-ajouter-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-client.html',
  styleUrl: './ajouter-client.css'
})
export class AjouterClient {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clientService = inject(ClientService);

  envoiEnCours = signal(false);
  erreur = signal('');

  formulaire = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    genre: ['', Validators.required],
    telephone: [''],
    adresse: [''],
    ville: [''],
    pays: ['']
  });

  // Bouton Enregistrer : on enregistre puis on va sur la liste des clients
  enregistrer() {

  if (this.formulaire.invalid) {
    this.formulaire.markAllAsTouched();
    return;
  }

  this.envoiEnCours.set(true);

  this.clientService.ajouterClient(this.formulaire.value).subscribe({

    next: (response) => {
      console.log('Client ajouté avec succès', response);

      this.envoiEnCours.set(false);

      this.router.navigate(['/ListeClients']);
    },

    error: (error) => {
      console.error('Erreur lors de l’ajout du client :', error);

      this.envoiEnCours.set(false);
      this.erreur.set("Erreur lors de l'enregistrement du client.");
    }

  });
}

  // Bouton Annuler : on reste sur la page ajouter-client avec un formulaire vide
  annuler(): void {
    this.formulaire.reset();
    this.erreur.set('');
  }

  // Croix, clic à côté de la fenêtre et touche Échap : retour à la liste
  @HostListener('document:keydown.escape')
  fermer(): void {
    this.router.navigate([ROUTE_LISTE]);
  }
}
