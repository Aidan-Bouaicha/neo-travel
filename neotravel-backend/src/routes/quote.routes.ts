import { Router } from "express";
import { QuoteController } from "../controllers/quote.controller";

const router = Router();

router.post("/", QuoteController.createQuote);

export default router;