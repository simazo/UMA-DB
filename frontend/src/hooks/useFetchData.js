import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url, transformData = (data) => data) => {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    let isMounted = true; // コンポーネントがアンマウントされたか判定

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(transformData(response.data));
          setError(null);
        }
      } catch (error) {
        if (isMounted){
          console.error(`Error fetching data from ${url}:`, error);
          setError(`データの取得に失敗しました: ${error.message || ''}`);
        } 
      } finally {
        if (isMounted){
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // クリーンアップ時にフラグを変更
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;