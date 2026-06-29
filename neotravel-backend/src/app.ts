import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import leadRoutes from "./routes/lead.routes";
import tripRoutes from "./routes/trip.routes";
import quoteRoutes from "./routes/quote.routes";
import quoteGenerationRoutes from "./routes/quote-generation.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/generate-quote", quoteGenerationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NeoTravel API is running",
  });
});

export default app;