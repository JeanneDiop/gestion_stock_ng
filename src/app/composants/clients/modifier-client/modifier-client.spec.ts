
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ModifierClientComponent } from './modifier-client';
import { ClientService } from '../../../services/client';
import { Client } from '../../../models/client';

describe('ModifierClientComponent', () => {

  let component: ModifierClientComponent;
  let fixture: ComponentFixture<ModifierClientComponent>;

  let nombreAppels: number;
  let nombreChargements: number;
  let erreurModification: boolean;

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
    nombreChargements = 0;
    erreurModification = false;

    const clientServiceFictif = {

      getClient: (id: number) => {
        nombreChargements++;
        return of(clientInitial);
      },

      modifierClient: (id: number, client: Client) => {
        nombreAppels++;

        if (erreurModification) {
          return throwError(() => new Error('Erreur'));
        }

        return of({});
      }

    };

    await TestBed.configureTestingModule({
      imports: [ModifierClientComponent],
      providers: [
        {
          provide: ClientService,
          useValue: clientServiceFictif
        },
        {
          provide: Router,
          useValue: {
            navigate: () => Promise.resolve(true)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierClientComponent);
    component = fixture.componentInstance;

    component.id = 1;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('devrait être créé', async () => {
    await creerComposant();

    expect(component).toBeTruthy();
  });

  it('devrait charger les informations du client', async () => {
    await creerComposant();

    expect(nombreChargements).toBe(1);
    expect(component.client.nom).toBe('Diop');
    expect(component.client.prenom).toBe('Awa');
  });

  it('devrait afficher les informations du client', async () => {
    await creerComposant();

    const texte = fixture.nativeElement.textContent;

    expect(texte).toContain('Diop');
    expect(texte).toContain('Awa');
    expect(texte).toContain('CL001');
  });

  it('devrait afficher le formulaire de modification', async () => {
    await creerComposant();

    const formulaire = fixture.nativeElement.querySelector('form');

    expect(formulaire).toBeTruthy();
  });

  it('devrait modifier le client', async () => {
    await creerComposant();

    component.modifierClient();

    expect(nombreAppels).toBe(1);
    expect(component.envoiEnCours()).toBe(false);
  });

  it('ne devrait pas modifier si aucun identifiant client existe', async () => {
    await creerComposant();

    component.client.id = 0;
    component.modifierClient();

    expect(nombreAppels).toBe(0);
    expect(component.erreur()).toBe('Identifiant du client introuvable.');
  });

  it('devrait afficher une erreur en cas de problème de modification', async () => {
    await creerComposant();

    erreurModification = true;
    component.modifierClient();

    expect(nombreAppels).toBe(1);
    expect(component.erreur()).toBe('Erreur lors de la modification du client.');
    expect(component.envoiEnCours()).toBe(false);
  });

  it('devrait annuler la modification', async () => {
    await creerComposant();

    component.annuler();

    expect(nombreAppels).toBe(0);
  });

});
