// 初期化時ではなく、実行時に読み取られるよう遅延評価で返す
export default {
  get imageUrl() {
    return process.env.IMAGE_URL;
  }
};