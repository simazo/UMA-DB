import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ルート (`UMA-DB/.env`) から環境変数を読み込む
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const db = mongoose.connection;

db.once('error', function (err) {
  console.error('connection error: ', err);
});

db.once('open', function () {
  console.log('Connected successfully');
});