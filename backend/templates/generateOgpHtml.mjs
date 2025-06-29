import imageConfig from "../config/imageConfig.js";

export const generateOgpHtml = (cryptid) => {

const imageUrl = imageConfig.imageUrl;
// console.log("🧪 generateOgpHtml > imageUrl:", imageUrl);

return `
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${cryptid.name}</title>

      <!-- OGPタグ -->
      <meta property="og:title" content="${cryptid.name}" />
      <meta property="og:description" content="${cryptid.name}に関する情報を掲載中" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://uma-db.com/cryptids/${cryptid._id}" />
      <meta property="og:image" content="${imageUrl}/${cryptid.id}/thumbnail.jpeg" />

      <!-- Twitterカード -->
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="世界中のUMAデータベース" />
      <meta name="twitter:description" content="${cryptid.name}に関する情報を掲載中" />
      <meta name="twitter:url" content="https://uma−db.com/cryptids/${cryptid._id}" /> 
      <meta name="twitter:image" content="${imageUrl}/${cryptid.id}/thumbnail.jpeg" />
    </head>
    <body>
      <script>
        window.location.href = "https://uma-db.com/cryptids/${cryptid._id}";
      </script>
      <h1>${cryptid.name}</h1>
      <p>${cryptid.name}に関する情報を掲載中</p>
      <a href="https://uma-db.com/cryptids/${cryptid._id}">詳細はこちら</a>
    </body>
  </html>
  `;
};