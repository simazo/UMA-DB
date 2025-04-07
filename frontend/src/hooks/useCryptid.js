import useFetchData from "./useFetchData";

const useCryptid = (API_BASE_URL, id) => {
  const url = `${API_BASE_URL}/cryptids/${id}`;
  return useFetchData(url);
};

export default useCryptid;