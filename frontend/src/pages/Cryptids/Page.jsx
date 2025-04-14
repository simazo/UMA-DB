import {
  Section,
  HeadPrimary,
  AsyncStateHandler,
} from "../../components";

import FilterInfo from "./FilterInfo";
import ResultInfo from "./ResultInfo";
import CryptidsList from "./CryptidsList";
import Pagination from "./Pagination";

const Page = ({
  loading,
  error,
  cryptids,
  pagination,
  currentPage,
  filterCategory,
  filterValue,
  onPageChange,
}) => {
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => {
        return (
          <>
            <Section>
              <HeadPrimary>UMA一覧</HeadPrimary>
            </Section>
            <Section>
              <FilterInfo
                filterCategory={filterCategory}
                filterValue={filterValue}
              />
            </Section>
            <Section>
              <ResultInfo
                cryptids={cryptids}
                pagination={pagination}
              />
              <CryptidsList
                cryptids={cryptids}
                loading={loading}
                error={error}
              />
            </Section>
            <Section>
              <Pagination 
                currentPage={currentPage}
                pagination={pagination}
                onPageChange={onPageChange}
              />
            </Section>
          </>
        );
      }}
    />
  );
};

export default Page;