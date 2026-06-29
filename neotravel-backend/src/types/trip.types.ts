export interface Trip {
  id?: string;

  lead_id: string;

  depart: string;

  arrivee: string;

  date_trajet: string;

  nb_passagers: number;

  aller_retour: boolean;

  distance_km?: number;

  special_request?: boolean;

  special_request_comment?: string;

  status?: string;

  created_at?: string;
}