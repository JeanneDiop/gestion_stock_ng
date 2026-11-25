
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ClientSupprimerComponent } from './supprimer-client';
import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';

describe('ClientSupprimerComponent', () => {

  let component: ClientSupprimerComponent;
  let fixture: ComponentFixture<ClientSupprimerComponent>;
  let nombreAppels: number;

  const clientInitial: Client = {
    id: 1,
    nom: 'Diop',
    prenom: 'Awa',
    genre: 'Femme',
    code_client: 'CL001',
    telephone: '770000001',
    ville: 'Dakar',
    pays: 'Sénégal'
  };

  async function creerComposant(): Promise<void> {

    nombreAppels = 0;

    const clientServiceFictif = {
      supprimerClient: (id: number) => {
        nombreAppels++;
        return of({});
      }
    };

    await TestBed.configureTestingModule({
      imports: [ClientSupprimerComponent],
      providers: [
        {
          provide: ClientService,
          useValue: clientServiceFictif
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSupprimerComponent);
    component = fixture.componentInstance;
    component.client = clientInitial;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('devrait être créé', async () => {
    await creerComposant();

    expect(component).toBeTruthy();
  });

  it('devrait afficher les informations du client', async () => {
    await creerComposant();

    const texte = fixture.nativeElement.textContent;

    expect(texte).toContain('Diop');
    expect(texte).toContain('Awa');
    expect(texte).toContain('CL001');
  });

  it('devrait afficher le message de confirmation', async () => {
    await creerComposant();

    const texte = fixture.nativeElement.textContent;

    expect(texte).toContain('Confirmation de suppression');
    expect(texte).toContain('Cette action est irréversible.');
  });

  it('devrait fermer la fenêtre quand on clique sur annuler', async () => {
    await creerComposant();

    component.fermer();
    fixture.detectChanges();

    expect(component.envoiEnCours()).toBe(false);
  });

  it('devrait fermer la fenêtre quand on clique sur la croix', async () => {
    await creerComposant();

    const bouton = fixture.nativeElement.querySelector('.btn-x');

    bouton.click();
    fixture.detectChanges();

    expect(component.envoiEnCours()).toBe(false);
  });

  it('devrait supprimer le client confirmé', async () => {
    await creerComposant();

    component.confirmerSuppression();

    expect(nombreAppels).toBe(1);
    expect(component.envoiEnCours()).toBe(false);
  });

  it('ne devrait rien supprimer si aucun identifiant client existe', async () => {
    await creerComposant();

    component.client = null as any;
    component.confirmerSuppression();

    expect(nombreAppels).toBe(0);
    expect(component.erreur()).toBe('Identifiant du client introuvable.');
  });

  it('devrait réinitialiser le chargement après la suppression', async () => {
    await creerComposant();

    component.confirmerSuppression();

    expect(component.envoiEnCours()).toBe(false);
  });

});
