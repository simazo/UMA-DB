import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のファイル（ogp.mjs）の絶対パスから、__dirname を取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ルート：frontend ディレクトリ
const rootDir = __dirname;

// 相対パスを組み立て
const inputDir = path.resolve(rootDir, '../backend/seeds');
const outputDir = path.resolve(rootDir, './public/ogp/cryptids');

const jsonFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.json'));

jsonFiles.forEach(file => {
  const filePath = path.join(inputDir, file);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);

  const { id, _id, name } = data;
  if (id === undefined || !_id || !name) {
    console.warn(`スキップ: ${file}（必要なフィールドが欠落）`);
    return;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta property="og:title" content="UMA-DB" />
    <meta property="og:description" content="${name}に関する詳しい情報を掲載中" />
    <meta property="og:image" content="https://pub-5c0123cb32d24b0c97d41e15ed23f921.r2.dev/${id}/thumbnail.jpeg" />
    <meta property="og:url" content="https://uma-db.com/cryptids/${_id}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="世界のUMAデータベース" />
    <meta name="twitter:description" content="${name}に関する詳しい情報を掲載中" />
    <meta name="twitter:image" content="https://pub-5c0123cb32d24b0c97d41e15ed23f921.r2.dev/${id}/thumbnail.jpeg" />
    <title>${name} | UMA-DB</title>
  </head>
  <body>
    <script>
      window.location.href = "/cryptids/${_id}";
    </script>
    <noscript>
      <p><a href="/cryptids/${_id}">こちら</a></p>
    </noscript>
  </body>
</html>`;

  const outputFilePath = path.join(outputDir, `${id}.html`);
  fs.writeFileSync(outputFilePath, htmlContent, 'utf-8');
  console.log(`✅ ${id}.html を生成しました`);
});
