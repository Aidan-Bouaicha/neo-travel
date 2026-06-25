import { Request, Response } from "express";
import { QuoteService } from "../services/quote.service";

export class QuoteController {
  static async createQuote(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        trip_id,
        distance,
        aller_retour,
        date_trajet,
        nb_passagers,
      } = req.body;

      const prix = QuoteService.calculatePrice(
        distance,
        aller_retour,
        date_trajet,
        nb_passagers
      );

      const quote = await QuoteService.createQuote({
        trip_id,
        quote_number: `DEV-${Date.now()}`,
        prix,
      });

      res.status(201).json({
        success: true,
        message: "Devis créé avec succès",
        data: quote,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création du devis",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}