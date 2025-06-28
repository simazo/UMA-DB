import imageConfig from "../config/imageConfig.js";
const imageUrl = imageConfig.imageUrl;

export const generateOgpHtml = (cryptid) => `
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
    <meta name="twitter:image" content="${imageUrl}/${cryptid.id}/thumbnail.jpeg" />

    <meta http-equiv="refresh" content="0; url=/cryptids/${cryptid._id}" />
  </head>
  <body>
  <script>
    // 本体ページへリダイレクト（JSが有効な場合）
    window.location.href = "/cryptids/${cryptid._id}";
    </script>
    <noscript>
      <p><a href="/cryptids/${cryptid._id}">こちら</a></p>
    </noscript>
  </body>
</html>
`;
