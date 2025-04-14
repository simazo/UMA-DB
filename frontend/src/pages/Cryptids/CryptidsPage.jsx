import {
  Section,
  HeadPrimary,
  AsyncStateHandler,
} from "../../components";

import FilterInfoSection from "./FilterInfoSection";
import ResultInfoSection from "./ResultInfoSection";
import CryptidsListSection from "./CryptidsListSection";
import PaginationSection from "./PaginationSection";

const CryptidsPage = ({
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
              <FilterInfoSection
                filterCategory={filterCategory}
                filterValue={filterValue}
              />
            </Section>
            <Section>
              <ResultInfoSection
                cryptids={cryptids}
                pagination={pagination}
              />
              <CryptidsListSection
                cryptids={cryptids}
                loading={loading}
                error={error}
              />
            </Section>
            <Section>
              <PaginationSection 
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

export default CryptidsPage;