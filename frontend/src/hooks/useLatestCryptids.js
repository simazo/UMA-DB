import useFetchData from "./useFetchData";

const useLatestCryptids = (API_BASE_URL) => {
  const url = `${API_BASE_URL}/cryptids?limit=4&sort=-createdAt`;
  return useFetchData(url, (data) => data.cryptids);
};

export default useLatestCryptids;