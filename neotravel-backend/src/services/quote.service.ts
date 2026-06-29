import { supabase } from "../config/supabase";
import {
  PRICE_GRID,
  PRICE_PER_KM,
  SEASON_COEFFICIENTS,
  CAPACITY_COEFFICIENTS,
  MAX_AUTO_PASSENGERS,
  MARGIN,
} from "../config/pricing";

import { Quote } from "../types/quote.types";

export class QuoteService {

  /**
   * Récupère tous les quotes avec les infos du trip associé
   */
  static async getAll(): Promise<Quote[]> {
    const { data, error } = await supabase
      .from("quotes")
      .select(`
        *,
        trip:trips(
          depart,
          arrivee,
          date_trajet,
          nb_passagers,
          lead:leads(nom, email)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Récupère un quote par son ID
   */
  static async getById(id: string): Promise<Quote | null> {
    const { data, error } = await supabase
      .from("quotes")
      .select(`
        *,
        trip:trips(
          depart,
          arrivee,
          date_trajet,
          nb_passagers,
          lead:leads(nom, email)
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Calcul du prix de base
   */
  static calculateBasePrice(distance: number): number {

    const forfait = PRICE_GRID.find(
      (item) => distance <= item.km
    );

    if (forfait) {
      return forfait.price;
    }

    return (distance * 2) * PRICE_PER_KM;
  }

  /**
   * Aller / Retour
   */
  private static applyRoundTrip(
    price: number,
    allerRetour: boolean
  ): number {

    if (allerRetour) {
      return price * 2;
    }

    return price;
  }

  /**
   * Saisonnalité
   */
  private static applySeason(
    price: number,
    dateTrajet: string
  ): number {

    const month = new Date(dateTrajet).getMonth() + 1;

    const coefficient =
      SEASON_COEFFICIENTS[
        month as keyof typeof SEASON_COEFFICIENTS
      ] ?? 0;

    return price + (price * coefficient);
  }

  /**
   * Date de réservation
   */
  private static applyPriority(
    price: number,
    dateTrajet: string
  ): number {

    const today = new Date();

    const departure = new Date(dateTrajet);

    const diffTime =
      departure.getTime() - today.getTime();

    const days = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (days <= 14) {
      return price * 1.10;
    }

    if (days <= 30) {
      return price * 1.05;
    }

    if (days <= 90) {
      return price * 0.95;
    }

    return price * 0.90;
  }

  /**
   * Nombre de passagers
   */
  private static applyCapacity(
    price: number,
    passengers: number
  ): number {

    if (passengers > MAX_AUTO_PASSENGERS) {
      throw new Error(
        "Plus de 85 passagers : traitement manuel."
      );
    }

    const capacity = CAPACITY_COEFFICIENTS.find(
      (item) =>
        passengers >= item.min &&
        passengers <= item.max
    );

    if (!capacity) {
      return price;
    }

    return price + (price * capacity.coefficient);
  }

  /**
   * Marge
   */
  private static applyMargin(
    price: number
  ): number {

    return price + (price * MARGIN);
  }

  /**
   * Calcul complet du devis
   */
  static calculatePrice(
    distance: number,
    allerRetour: boolean,
    dateTrajet: string,
    passengers: number
  ): number {

    let price = this.calculateBasePrice(distance);

    price = this.applyRoundTrip(
      price,
      allerRetour
    );

    price = this.applySeason(
      price,
      dateTrajet
    );

    price = this.applyPriority(
      price,
      dateTrajet
    );

    price = this.applyCapacity(
      price,
      passengers
    );

    price = this.applyMargin(
      price
    );

    return Math.round(price);
  }

  /**
   * Sauvegarde du devis
   */
  static async createQuote(
    quote: Quote
  ): Promise<Quote> {

    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          trip_id: quote.trip_id,
          quote_number: quote.quote_number,
          prix: quote.prix,
          pdf_url: quote.pdf_url,
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