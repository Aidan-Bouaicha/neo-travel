import { Router } from "express";
import { TripController } from "../controllers/trip.controller";

const router = Router();

// GET /api/trips - Récupérer tous les trips
router.get("/", TripController.getAll);

// GET /api/trips/:id - Récupérer un trip par ID
router.get("/:id", TripController.getById);

// POST /api/trips - Créer un nouveau trip
router.post("/", TripController.createTrip);

export default router;