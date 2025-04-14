import useFetchData from "./useFetchData";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useCryptidCount = () => {
  const url = `${API_BASE_URL}/cryptids/count`;
  return useFetchData(url, (data) => data.count);
};

export default useCryptidCount;