## デプロイに関するメモ
デプロイ後にenvの再読み込みが必要な場合、以下の手順でPM2を再起動すること

1. デプロイに伴いenvが消えるのでbackendディレクトリで.envを作り直し
2. backendディレクトリでnpm install
3. 最後にpm2 restart uma-db でpm2を再起動する


