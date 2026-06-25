import { Router } from "express";
import { QuoteGenerationController } from "../controllers/quote-generation.controller";

const router = Router();

router.post("/", QuoteGenerationController.generateQuote);

export default router;