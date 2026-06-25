import { Router } from "express";
import { TripController } from "../controllers/trip.controller";

const router = Router();

router.post("/", TripController.createTrip);

export default router;