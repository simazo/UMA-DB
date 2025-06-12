## OGP用htmlファイル生成バッチについて

### 目的
Twitter投稿時にアイキャッチ画像を表示するためには、<head>内に<meta property="og:url">などのタグが必要。

### 背景
当初は、metaタグ設定をコンポーネントで動的に設定したが、Reactは基本的にクライアントサイドレンダリングなのでこの方法が通用しない。
Next.jsなどのSSRであればサーバサイドレンダリングで可能だが、作り直しになるので却下。
そこであらかじめ静的なhtmlファイルを用意しておく事で対応した。

### バッチの使い方
frontend直下で

```
node ogp.mjs
```

と入力すると、backend/seedsに置いたjsonファイルを元にpublic/ogp/cryptid内にhtmlファイルを生成する。

