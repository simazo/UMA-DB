// クエリパラメータの文字列を、対応するキーと値のペアとしてオブジェクトに変換して返す
export const extractQueryParams = (keys, searchParams) => {
  return keys.reduce((acc, key) => {
    const value = searchParams.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
};
