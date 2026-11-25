import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';

// ⚠️ Adapte cette route : page vers laquelle on revient en fermant la fenêtre
const ROUTE_LISTE = '/ListeClients';

@Component({
  selector: 'app-details-client',
  standalone: true,
  imports: [],
    templateUrl: './detail-client.html',
  styleUrl: './detail-client.css'
})
export class DetailsClientComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);

  client = signal<Client | null>(null);
  chargement = signal(true);
  erreur = signal('');
  ongletActif = signal(0);

  onglets = [
    { titre: 'Identité', icone: 'fas fa-user' },
    { titre: 'Contact', icone: 'fas fa-phone' },
    { titre: 'Localisation', icone: 'fas fa-map-marker-alt' }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erreur.set('Identifiant du client invalide.');
      this.chargement.set(false);
      return;
    }

    // ⚠️ Adapte le nom de la méthode à ton service (getById, getClient, ...)
   this.clientService.getClient(id).subscribe({
  next: (res: any) => {
    const data: Client = res?.data ?? res;
    this.client.set(data);
    this.chargement.set(false);
  },
  error: () => {
    this.erreur.set('Impossible de charger ce client.');
    this.chargement.set(false);
  }
});
  }

  initiales(): string {
    const c = this.client();
    const n = (c?.nom || '').charAt(0);
    const p = (c?.prenom || '').charAt(0);
    return (n + p).toUpperCase() || '?';
  }

  allerA(index: number): void {
    this.ongletActif.set(index);
  }

  precedent(): void {
    if (this.ongletActif() > 0) {
      this.ongletActif.update(i => i - 1);
    }
  }

  suivant(): void {
    if (this.ongletActif() < this.onglets.length - 1) {
      this.ongletActif.update(i => i + 1);
    }
  }

  // La touche Échap ferme la fenêtre
  @HostListener('document:keydown.escape')
  fermer(): void {
    this.router.navigate([ROUTE_LISTE]);
  }
}
