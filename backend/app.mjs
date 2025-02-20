import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.mjs"

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
  import("./helpers/db.mjs")
    .then(() => {
      console.log("Database module imported successfully.");
    })
    .catch(err => {
      console.error("Error importing the database module:", err);
    });
} else {
  console.log("Skipping database import in test environment.");
}

const app = express();

const allowedOrigins = process.env.FRONTEND_ORIGIN?.split(",") || ["http://localhost:3000"];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  const errorMessage = err.message || "An unexpected error has occurred.";
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: errorMessage });
});

export default app;

