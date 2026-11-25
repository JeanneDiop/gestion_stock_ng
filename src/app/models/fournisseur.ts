
export interface Fournisseur {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string | null;
  email: string | null;
  email_verified_at?: string | null;
  password?: string | null;
  nom_entreprise?: string | null;
  genre: 'Homme' | 'Femme';
  adresse?: string | null;
  site_web?: string | null;
  statut: 'Actif' | 'Inactif';
  created_at?: string;
  updated_at?: string;
}
