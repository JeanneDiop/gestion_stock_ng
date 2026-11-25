export interface User {
  id?: number;
  nom: string;
  prenom: string;
  telephone?: string | null;
  email?: string | null;
  username?: string | null;
  email_verified_at?: string | null;
  password?: string | null;
  genre: 'Homme' | 'Femme';
  etat?: 'actif' | 'inactif';
  adresse: string;
  role_nom: string;
  created_at?: string;
  updated_at?: string;
}