import { Section } from "../components/layouts";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { CryptidCard, CardContainer } from "../components/cards";
import TextWithIcon from "../components/TextWithIcon";
import { PaginationContainer, PaginationInfo } from "../components/paginations";
import { ButtonWithIcon } from "../components/buttons";
import useCryptids from "../hooks/useCryptids";
import usePageChange  from "../hooks/usePageChange";
import AsyncStateHandler from "../components/AsyncStateHandler";
import useCryptidQueryParams from "../hooks/useCryptidQueryParams";

const CryptidList = () => {  
  const { queryParams, filterCategory, filterValue } = useCryptidQueryParams();
  const { data, error, loading } = useCryptids(queryParams);
  const { handlePageChange } = usePageChange(data?.pagination);
  
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => {
        const { cryptids, pagination } = data;
        const currentPage = parseInt(queryParams.page) || 1;

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
                <ButtonWithIcon key="back" onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination.hasPrevPage} iconSrc="image/i-orange-issie.svg" alt="前へ戻る">
                  前へ
                </ButtonWithIcon>
                <PaginationInfo currentPage={currentPage} totalPages={pagination.totalPages} />
                <ButtonWithIcon key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination.hasNextPage} iconSrc="image/i-orange-issie.svg" alt="次へ進む">
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

export default CryptidList;