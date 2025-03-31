import { useEffect } from "react";
import axios from "axios";

// 非同期リクエスト用の汎用関数
const useFetchData = (url, dataSetter, errorSetter) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        dataSetter(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        errorSetter(`データの取得に失敗しました: ${error.message || ''}`);
      }
    };

    fetchData();
  }, [url, dataSetter, errorSetter]);
};

export default useFetchData;