import { Request, Response } from "express";
import { LeadService } from "../services/lead.service";

export class LeadController {
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