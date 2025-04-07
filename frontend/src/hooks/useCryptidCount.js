import useFetchData from "./useFetchData";

const useCryptidCount = (API_BASE_URL) => {
  const url = `${API_BASE_URL}/cryptids/count`;
  return useFetchData(url, (data) => data.count);
};

export default useCryptidCount;