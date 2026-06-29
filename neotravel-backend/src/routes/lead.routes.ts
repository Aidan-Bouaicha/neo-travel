import { Router } from "express";
import { LeadController } from "../controllers/lead.controller";

const router = Router();

// GET /api/leads - Récupérer tous les leads
router.get("/", LeadController.getAll);

// GET /api/leads/:id - Récupérer un lead par ID
router.get("/:id", LeadController.getById);

// POST /api/leads - Créer un nouveau lead
router.post("/", LeadController.createLead);

export default router;