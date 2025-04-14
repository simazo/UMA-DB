import useFetchData from "./useFetchData";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useCryptid = (id) => {
  const url = `${API_BASE_URL}/cryptids/${id}`;
  return useFetchData(url);
};

export default useCryptid;