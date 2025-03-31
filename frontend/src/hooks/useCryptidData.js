import { useState, useEffect } from "react";
import axios from "axios";

const useCryptidData = (API_BASE_URL) => {
  const [ latestCryptids, setLatestCryptids ] = useState([]);
  const [ count, setCount ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchLatestCryptids = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cryptids?limit=4&sort=-createdAt`);
        setLatestCryptids(response.data.cryptids);
      } catch (error) {
        console.error("Error fetching latest cryptids:", error);
        setError("データの取得に失敗しました。");
      }
    };

    const fetchDataCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cryptids/count`);
        setCount(response.data.count);
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