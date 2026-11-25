import { Categorie } from "./categorie";
import { Fournisseur } from "./fournisseur";

export interface Produit {
  id: number;
  nomproduit: string;
  description: string;
  prix?: number;
  image?: string | null;
  etat: string;
  categorie_id: number;
  fournisseur_id: number;
  created_at?: string;
  updated_at?: string;
}
