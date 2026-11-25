export interface Client {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  genre: 'Homme' | 'Femme';
  code_client?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  ville?: string | null;
  pays?: string | null;
  created_at?: string;
  updated_at?: string;
}
