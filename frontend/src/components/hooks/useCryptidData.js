import { useState, useEffect } from "react";


const useCryptidData = (API_BASE_URL) => {
  const [ latestCryptids, setLatestCryptids ] = useState([]);
  const [ count, setCount ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchLatestCryptids = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cryptids?limit=4&sort=-createdAt`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLatestCryptids(data.cryptids);
      } catch (error) {
        console.error("Error fetching latest cryptids:", error);
        setError("データの取得に失敗しました。");
      }
    };

    const fetchDataCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cryptids/count`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCount(data.count); // データ件数の状態更新
      } catch (error) {
        console.error("Error fetching data count:", error);
      }
    };

    fetchLatestCryptids();
    fetchDataCount();
  }, []);

  return { latestCryptids, count, error };
};

export default useCryptidData;