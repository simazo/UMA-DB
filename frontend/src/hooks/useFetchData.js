import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, transformData = (data) => data) => {
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(transformData(response.data));
      setError(null);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError(`データの取得に失敗しました: ${error.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;