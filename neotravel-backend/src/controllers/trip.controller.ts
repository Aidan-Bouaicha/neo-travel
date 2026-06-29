import { Request, Response } from "express";
import { TripService } from "../services/trip.service";

export class TripController {
  /**
   * Récupère tous les trips
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const trips = await TripService.getAll();

      res.status(200).json({
        success: true,
        data: trips,
        count: trips.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des trips",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Récupère un trip par son ID
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const trip = await TripService.getById(id);

      if (!trip) {
        res.status(404).json({
          success: false,
          message: "Trip non trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du trip",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Crée un nouveau trip
   */
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