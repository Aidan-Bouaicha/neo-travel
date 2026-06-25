import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import leadRoutes from "./routes/lead.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "NeoTravel API is running",
  });
});

export default app;