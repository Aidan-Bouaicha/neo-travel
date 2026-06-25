import { Router } from "express";
import { supabase } from "../config/supabase";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "NeoTravel API is running",
    timestamp: new Date(),
  });
});

router.get("/database", async (req, res) => {
  try {
    const { error } = await supabase
      .from("leads")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Connexion à Supabase échouée",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Connexion à Supabase réussie 🚀",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: err,
    });
  }
});

export default router;