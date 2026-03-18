import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkwebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Connect DB
await connectDB();

// Server uploads folder
app.use("/uploads", express.static("uploads"));
app.use("/resumes", express.static("resumes"));

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.get("/debug-sentry", (req, res) => {
  throw new Error("Test Sentry error!");
});
app.post("/webhooks", clerkwebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Sentry error handler: après les routes
Sentry.setupExpressErrorHandler(app);

// Optionnel : ton propre handler d'erreur ensuite
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
