import { useCryptids, usePageChange, useCryptidQueryParams } from "../hooks";
import CryptidsPage from "../pages/Cryptids/CryptidsPage";

const CryptidsContainer = () => {
  const {
    queryParams,
    filterCategory,
    filterValue,
  } = useCryptidQueryParams();

  const {
    data,
    error,
    loading,
  } = useCryptids(queryParams);

  const cryptids = data?.cryptids || [];
  const pagination = data?.pagination || {};
  
  const currentPage = pagination.currentPage || 1;
  const { handlePageChange } = usePageChange(pagination);

  return (
    <CryptidsPage
      loading={loading}
      error={error}
      cryptids={cryptids}
      pagination={pagination}
      currentPage={currentPage}
      filterCategory={filterCategory}
      filterValue={filterValue}
      onPageChange={handlePageChange}
    />
  );
};

export default CryptidsContainer;