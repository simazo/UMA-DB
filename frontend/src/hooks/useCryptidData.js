import { useState } from "react";
import useFetchData from "./useFetchData";

const useCryptidData = (API_BASE_URL) => {
  const [ latestCryptids, setLatestCryptids ] = useState([]);
  const [ count, setCount ] = useState(null);
  const [ error, setError ] = useState(null);

  // APIリクエストURLの定義
  const latestUrl = `${API_BASE_URL}/cryptids?limit=4&sort=-createdAt`;
  const countUrl = `${API_BASE_URL}/cryptids/count`;

  // データのフェッチを共通化したカスタムフック
  useFetchData(latestUrl, (data) => setLatestCryptids(data.cryptids), setError);
  useFetchData(countUrl, (data) => setCount(data.count), setError);

  return { latestCryptids, count, error };
};

export default useCryptidData;