import { Router } from "express";
import { QuoteController } from "../controllers/quote.controller";

const router = Router();

// GET /api/quotes - Récupérer tous les quotes
router.get("/", QuoteController.getAll);

// GET /api/quotes/:id - Récupérer un quote par ID
router.get("/:id", QuoteController.getById);

// POST /api/quotes - Créer un nouveau quote
router.post("/", QuoteController.createQuote);

export default router;