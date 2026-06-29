import { supabase } from "../config/supabase";
import { Lead } from "../types/lead.types";

export class LeadService {
  /**
   * Récupère tous les leads
   */
  static async getAll(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Récupère un lead par son ID
   */
  static async getById(id: string): Promise<Lead | null> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Crée un nouveau lead
   */
  static async createLead(lead: Lead): Promise<Lead> {
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          nom: lead.nom,
          email: lead.email,
          telephone: lead.telephone,
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