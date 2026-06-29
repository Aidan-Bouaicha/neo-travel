import { Request, Response } from "express";
import { LeadService } from "../services/lead.service";

export class LeadController {
  /**
   * Récupère tous les leads
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getAll();

      res.status(200).json({
        success: true,
        data: leads,
        count: leads.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des leads",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Récupère un lead par son ID
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const lead = await LeadService.getById(id);

      if (!lead) {
        res.status(404).json({
          success: false,
          message: "Lead non trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: lead,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du lead",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Crée un nouveau lead
   */
  static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const lead = await LeadService.createLead(req.body);

      res.status(201).json({
        success: true,
        message: "Lead créé avec succès",
        data: lead,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création du lead",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}