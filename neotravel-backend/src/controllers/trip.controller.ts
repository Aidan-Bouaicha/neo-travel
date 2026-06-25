import { Request, Response } from "express";
import { TripService } from "../services/trip.service";

export class TripController {
  static async createTrip(req: Request, res: Response): Promise<void> {
    try {
      const trip = await TripService.createTrip(req.body);

      res.status(201).json({
        success: true,
        message: "Trip créé avec succès",
        data: trip,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création du trip",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}