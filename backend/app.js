import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// --- Add this check to ensure your .env file is loaded ---
if (!process.env.FRONTEND_URL) {
  console.error("FATAL ERROR: FRONTEND_URL is not defined in .env file.");
  process.exit(1); // Exit the application if the URL is not set
}
// ---------------------------------------------------------

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    // CHANGED: Added OPTIONS and other common methods
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;