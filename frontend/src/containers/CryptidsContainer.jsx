import { useCryptids, usePageChange, useCryptidQueryParams } from "../hooks";
import Page from "../pages/Cryptids/Page";

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
    <Page
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