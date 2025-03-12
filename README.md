# UMA-DB


## 使用技術一覧
| 項目         | 内容                                                            |
|--------------|-----------------------------------------------------------------|
| フロントエンド | React (v18.3.1), Sass (v1.83.4) |
| バックエンド  | Express (v4.21.2) |
| DB           | MongoDB Atlas                                             |
| ストレージ      | Cloudflare R2                      |
| サーバ      | Render(React)、conoha VPS(apiサーバ)                     |
| CI/CD      | Github Actions                     |



## デプロイに関するメモ
envの再読み込みなどが必要な場合は、デプロイ後に以下の手順でVPSサーバを再起動すること
１．envが消えるので作り直し
２．backendディレクトリでnpm install
３．最後にpm2 restart serverで再起動
※余力できたらこの辺りも自動化するかも