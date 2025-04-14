import useFetchData from "./useFetchData";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useLatestCryptids = () => {
  const url = `${API_BASE_URL}/cryptids?limit=4&sort=-createdAt`;
  return useFetchData(url, (data) => data.cryptids);
};

export default useLatestCryptids;