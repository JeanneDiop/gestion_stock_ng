import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ListeClients } from './liste-client';
import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';

describe('ListeClients', () => {
  let component: ListeClients;
  let fixture: ComponentFixture<ListeClients>;
  let clientsApi: Client[];
  let idsSupprimes: number[];

  const clientsInitiaux: Client[] = [
    { id: 1, nom: 'Diop', prenom: 'Awa', genre: 'Femme', code_client: 'CL001', telephone: '770000001', ville: 'Dakar', pays: 'Sénégal' },
    { id: 2, nom: 'Fall', prenom: 'Moussa', genre: 'Homme', code_client: 'CL002', telephone: '770000002', ville: 'Thiès', pays: 'Sénégal' }
  ];

  // Faux service : aucune requête HTTP réelle n'est envoyée
  const creerServiceFactice = () => ({
    getClients: () => of({ data: clientsApi }),
    supprimerClient: (id: number) => {
      idsSupprimes.push(id);
      clientsApi = clientsApi.filter(c => c.id !== id);
      return of({});
    }
  });

  async function creerComposant(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [ListeClients],
      providers: [
        provideRouter([]),
        { provide: ClientService, useValue: creerServiceFactice() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(() => {
    clientsApi = [...clientsInitiaux];
    idsSupprimes = [];
  });

  it('devrait être créé', async () => {
    await creerComposant();
    expect(component).toBeTruthy();
  });

  it('devrait charger la liste des clients au démarrage', async () => {
    await creerComposant();
    expect(component.clients().length).toBe(2);
  });

  it('devrait afficher une ligne par client dans le tableau', async () => {
    await creerComposant();
    const lignes = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(lignes.length).toBe(2);
  });

  it('devrait afficher un message quand il n\'y a aucun client', async () => {
    clientsApi = [];
    await creerComposant();
    const texte: string = fixture.nativeElement.textContent;
    expect(texte).toContain('Aucun client disponible.');
  });

  it('devrait ouvrir la fenêtre de confirmation au clic sur supprimer', async () => {
    await creerComposant();
    component.ouvrirModalSuppression(clientsInitiaux[0]);
    fixture.detectChanges();

    expect(component.clientASupprimer()).toEqual(clientsInitiaux[0]);
    expect(fixture.nativeElement.querySelector('.modal-overlay')).toBeTruthy();
  });

  it('devrait fermer la fenêtre quand on annule', async () => {
    await creerComposant();
    component.ouvrirModalSuppression(clientsInitiaux[0]);
    component.fermerModal();
    fixture.detectChanges();

    expect(component.clientASupprimer()).toBeNull();
    expect(fixture.nativeElement.querySelector('.modal-overlay')).toBeNull();
  });

  it('devrait supprimer le client confirmé puis recharger la liste', async () => {
    await creerComposant();
    component.ouvrirModalSuppression(clientsInitiaux[0]);
    component.confirmerSuppression();
    fixture.detectChanges();

    expect(idsSupprimes).toEqual([1]);
    expect(component.clients().length).toBe(1);
    expect(component.clients()[0].id).toBe(2);
    expect(component.clientASupprimer()).toBeNull();
  });

  it('ne devrait rien supprimer si aucun client n\'est sélectionné', async () => {
    await creerComposant();
    component.confirmerSuppression();

    expect(idsSupprimes.length).toBe(0);
    expect(component.clients().length).toBe(2);
  });
});
