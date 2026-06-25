import { Router } from "express";
import { LeadController } from "../controllers/lead.controller";

const router = Router();

router.post("/", LeadController.createLead);

export default router;