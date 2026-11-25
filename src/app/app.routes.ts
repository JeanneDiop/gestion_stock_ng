import { Routes } from '@angular/router';

import { AuthComponent } from './composants/auth/login/login';
import { AccueilComponent } from './composants/accueil/accueil';
import { ListeProduits } from './composants/produits/liste-produits/liste-produits';
import { AjouterProduit } from './composants/produits/ajouter-produit/ajouter-produit';
import { ModifierProduit } from './composants/produits/modifier-produit/modifier-produit';
import { DetailsProduit } from './composants/produits/details-produit/details-produit';
import { AjouterUser } from './composants/user/ajouter-user/ajouter-user';
import { ListeUser } from './composants/user/liste-user/liste-user';
import { AjouterCategorie } from './composants/categories/ajouter-categorie/ajouter-categorie';
import { ListeCategories } from './composants/categories/liste-categorie/liste-categorie';
import {ListeFournisseurs} from './composants/fournisseurs/liste-fournisseur/liste-fournisseur';
import { AjouterFournisseur } from './composants/fournisseurs/ajouter-fournisseur/ajouter-fournisseur';
import {ListeClients} from './composants/clients/liste-client/liste-client';
import { AjouterClient } from './composants/clients/ajouter-client/ajouter-client';
import {DetailsClientComponent} from './composants/clients/detail-client/detail-client';
import {ModifierClientComponent} from './composants/clients/modifier-client/modifier-client';
import {ClientSupprimerComponent} from './composants/clients/supprimer-client/supprimer-client';
import {SupprimerUser} from './composants/user/supprimer-user/supprimer-user';
import {ModifierUser} from './composants/user/modifier-user/modifier-user';


export const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },

  {
    path: 'ListeProduits',
    component: ListeProduits
  },
  {
    path: 'ajouter-produit',
    component: AjouterProduit
  },
  {
    path: 'modifier-produit/:id',
    component: ModifierProduit
  },
 {
  path: 'details-produit/:id',
  component: DetailsProduit
},
{
  path: 'ajouter-user',
  component: AjouterUser
},

{
    path: 'ListeUtilisateurs',
    component: ListeUser
},
   {
    path: 'ajouter-categorie',
    component: AjouterCategorie
  },
  {
    path: 'ListeCategories',
    component: ListeCategories
  },
   {
    path: 'ListeFournisseurs',
    component: ListeFournisseurs
  },
{
  path: 'ajouter-fournisseur',
  component: AjouterFournisseur
},
{
    path: 'ListeClients',
    component: ListeClients
  },
{
  path: 'ajouter-client',
  component: AjouterClient
},
 {
  path: 'detail-client/:id',
  component: DetailsClientComponent
},
{
  path: 'modifier-client/:id',
  component: ModifierClientComponent
},

{
  path: 'supprimer-client/:id',
  component: ClientSupprimerComponent
},

{
  path: 'supprimer-user/:id',
  component: SupprimerUser
},
{
  path: 'modifier-user/:id',
  component: ModifierUser
},

];
