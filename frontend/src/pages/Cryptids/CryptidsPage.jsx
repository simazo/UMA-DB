import {
  Section,
  HeadPrimary,
  HeadSecondary,
  CryptidCard,
  CardContainer,
  TextWithIcon,
  PaginationContainer,
  PaginationInfo,
  ButtonWithIcon,
  AsyncStateHandler,
} from "../../components";

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
              <h4>
                {filterCategory && filterValue
                  ? `${filterCategory}: 「${filterValue}」 で絞り込み`
                  : "条件なし"}
              </h4>
            </Section>
            <Section>
              <HeadSecondary>
              <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">
                {cryptids.length === 0
                  ? "見つかりませんでした"
                  : `${pagination.totalDocs}件のUMAが見つかりました`
                }
              </TextWithIcon>
              </HeadSecondary>
              <CardContainer>
                <AsyncStateHandler
                  loading={loading}
                  error={error}
                  render={() => (<CryptidCard cryptids={cryptids} isNew={false} />)}
                />
              </CardContainer>
            </Section>
            <Section>
              <PaginationContainer>
                <ButtonWithIcon 
                  key="back" 
                  onClick={() => onPageChange(currentPage - 1)} 
                  disabled={!pagination.hasPrevPage} 
                  iconSrc="image/i-orange-issie.svg" 
                  alt="前へ戻る"
                >
                  前へ
                </ButtonWithIcon>
                <PaginationInfo currentPage={currentPage} totalPages={pagination.totalPages} />
                <ButtonWithIcon 
                  key="next" 
                  onClick={() => onPageChange(currentPage + 1)} 
                  disabled={!pagination.hasNextPage} 
                  iconSrc="image/i-orange-issie.svg" 
                  alt="次へ進む"
                >
                  次へ
                </ButtonWithIcon>
              </PaginationContainer>
            </Section>
          </>
        );
      }}
    />
  );
};

export default CryptidsPage;