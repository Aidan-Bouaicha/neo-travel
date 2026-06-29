import { supabase } from "../config/supabase";
import { Trip } from "../types/trip.types";

export class TripService {
  /**
   * Récupère tous les trips avec les infos du lead associé
   */
  static async getAll(): Promise<Trip[]> {
    const { data, error } = await supabase
      .from("trips")
      .select(`
        *,
        lead:leads(nom, email)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Récupère un trip par son ID
   */
  static async getById(id: string): Promise<Trip | null> {
    const { data, error } = await supabase
      .from("trips")
      .select(`
        *,
        lead:leads(nom, email)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Crée un nouveau trip
   */
  static async createTrip(trip: Trip): Promise<Trip> {
    const { data, error } = await supabase
      .from("trips")
      .insert([
        {
          lead_id: trip.lead_id,
          depart: trip.depart,
          arrivee: trip.arrivee,
          date_trajet: trip.date_trajet,
          nb_passagers: trip.nb_passagers,
          aller_retour: trip.aller_retour,
          distance_km: trip.distance_km,
          special_request: trip.special_request,
          special_request_comment: trip.special_request_comment,
          status: trip.status,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}