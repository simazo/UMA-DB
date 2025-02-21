export default {
  transform: {
    '^.+\\.mjs$': 'babel-jest', // .mjs ファイルをトランスパイルする
  },
  testEnvironment: "node",
  moduleFileExtensions: ['mjs', 'js', 'json', 'node'], // テスト対象の拡張子
  testMatch: ['**/tests/**/*.test.mjs'],
  collectCoverage: true, // カバレッジを収集
  collectCoverageFrom: [
    "**/*.mjs", // 対象ファイル
    "!**/*.test.mjs", // テストファイルは除外
    "!app.mjs", // 除外
    "!jest.config.mjs", // 除外
    "!server.mjs", // エントリポイントは除外
    "!helpers/*.mjs", // helpersは除外
  ],
  coverageDirectory: "coverage", // レポートの出力先ディレクトリ
  coverageReporters: ["text", "lcov"], // レポート形式
};