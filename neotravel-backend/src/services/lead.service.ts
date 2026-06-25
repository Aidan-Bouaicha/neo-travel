import { supabase } from "../config/supabase";
import { Lead } from "../types/lead.types";

export class LeadService {
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