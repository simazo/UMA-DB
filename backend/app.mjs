import express from "express";
import router from "./routes/index.mjs"
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

