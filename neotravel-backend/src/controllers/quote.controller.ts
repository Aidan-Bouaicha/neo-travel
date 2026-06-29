import { Request, Response } from "express";
import { QuoteService } from "../services/quote.service";

export class QuoteController {
  /**
   * Récupère tous les quotes
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const quotes = await QuoteService.getAll();

      res.status(200).json({
        success: true,
        data: quotes,
        count: quotes.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des quotes",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Récupère un quote par son ID
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const quote = await QuoteService.getById(id);

      if (!quote) {
        res.status(404).json({
          success: false,
          message: "Quote non trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: quote,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du quote",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Crée un nouveau quote
   */
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