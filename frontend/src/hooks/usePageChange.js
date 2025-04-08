import { useSearchParams } from "react-router-dom";

const usePageChange = (pagination) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };
  return { handlePageChange };
};

export default usePageChange;