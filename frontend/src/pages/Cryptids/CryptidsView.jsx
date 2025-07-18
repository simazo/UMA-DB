import { Section,HeadPrimary,AsyncStateHandler } from "../../components";
import { FilterInfo, ResultInfo, CryptidsList, Pagination } from ".";

const CryptidsView = ({
  loading,
  error,
  cryptids,
  pagination,
  currentPage,
  filterCategory,
  filterValue,
  filterNote,
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
                filterNote={filterNote}
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

export default CryptidsView;