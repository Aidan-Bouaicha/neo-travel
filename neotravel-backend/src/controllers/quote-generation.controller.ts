import { Request, Response } from "express";
import { LeadService } from "../services/lead.service";
import { TripService } from "../services/trip.service";
import { QuoteService } from "../services/quote.service";
import { PdfService } from "../services/pdf.service";
import { MailService } from "../services/mail.service";

export class QuoteGenerationController {
  static async generateQuote(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        nom,
        email,
        telephone,
        depart,
        arrivee,
        date_trajet,
        nb_passagers,
        aller_retour,
        distance_km,
        special_request,
        special_request_comment,
      } = req.body;

      // 1. Création du lead
      const lead = await LeadService.createLead({
        nom,
        email,
        telephone,
      });

      // 2. Création du trajet
      const trip = await TripService.createTrip({
        lead_id: lead.id!,
        depart,
        arrivee,
        date_trajet,
        nb_passagers,
        aller_retour,
        distance_km,
        special_request,
        special_request_comment,
        status: "PENDING",
      });

      // 3. Calcul du prix
      const prix = QuoteService.calculatePrice(
        distance_km,
        aller_retour,
        date_trajet,
        nb_passagers
      );

      // 4. Création du devis
      const quote = await QuoteService.createQuote({
        trip_id: trip.id!,
        quote_number: `DEV-${Date.now()}`,
        prix,
      });

      // 5. Génération du PDF
      const pdfPath = await PdfService.generateQuotePdf({
        quote_number: quote.quote_number,
        nom,
        email,
        depart,
        arrivee,
        date_trajet,
        nb_passagers,
        prix,
      });

      // 6. Envoi du mail
      await MailService.sendQuoteEmail(
        email,
        quote.quote_number
      );

      // 7. Réponse
      res.status(201).json({
        success: true,
        message: "Devis généré avec succès",
        data: {
          lead,
          trip,
          quote,
          pdf: pdfPath,
          emailSent: true,
        },
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de la génération du devis",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}