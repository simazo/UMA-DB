import useFetchData from "./useFetchData";

const useCryptids = (API_BASE_URL, queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${API_BASE_URL}/cryptids?${queryString}`;
  return useFetchData(url, (data) => ({
    cryptids: data.cryptids || [],
    pagination: data.pagination || {
      totalDocs: 0,
      totalPages: 1,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  }));
};

export default useCryptids;
