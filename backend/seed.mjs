import fs from "fs";
import path from "path";
import { Cryptid } from "./models/cryptid.mjs"; // モデルのインポート
import mongoose from "mongoose";
import dotenv from "dotenv";

// MongoDBへの接続設定
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDBに接続しました"))
  .catch(err => console.error("❌ MongoDB接続エラー:", err));

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// seedsディレクトリ内のすべてのJSONファイルを取得
const seedFiles = fs.readdirSync(path.join(__dirname, "seeds")).filter(file => file.endsWith(".json"));

async function importData() {
  for (const file of seedFiles) {
    const filePath = path.join(__dirname, "seeds", file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8")); // 1 件のデータ

    try {
      // まずデータが存在するかを確認
      const existingCryptid = await Cryptid.findOne({ id: jsonData.id });

      if (existingCryptid) {
        // 存在する場合は更新
        await Cryptid.findOneAndUpdate({ id: jsonData.id }, jsonData, { new: true });
        console.log(`✅ ${file} のデータをアップデートしました`);
      } else {
        // 存在しない場合は新規挿入
        await Cryptid.create(jsonData);
        console.log(`✅ ${file} のデータをインポートしました`);
      }
    } catch (err) {
      console.error(`❌ ${file} のインポート中にエラーが発生しました:`, err);
    }
  }
  
  mongoose.disconnect(); // MongoDBの接続を切る
}

// データのインポートを実行
importData();
