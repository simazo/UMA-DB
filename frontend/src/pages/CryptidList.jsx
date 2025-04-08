
import { useLocation, useNavigate } from "react-router-dom";
import { Section } from "../components/layouts";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { AREA, SIZE, REGION, UMA_TYPE } from "../constants";
import { CryptidCard, CardContainer } from "../components/cards";
import TextWithIcon from "../components/TextWithIcon";
import { PaginationContainer, PaginationInfo } from "../components/paginations";
import { ButtonWithIcon } from "../components/buttons";
import useCryptids from "../hooks/useCryptids";
import AsyncStateHandler from "../components/AsyncStateHandler";
import { extractQueryParams, getFilterInfo } from "../utils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CryptidList = () => {  
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  
  const queryParams = extractQueryParams(
    [
      "area", 
      "size", 
      "name", 
      "region", 
      "uma_type", 
      "sort", 
      "limit", 
      "page"
    ], 
    params
  );

  if (!queryParams.page) {
    queryParams.page = "1";
  }

  const { data, error, loading } = useCryptids(API_BASE_URL, queryParams);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const { cryptids, pagination } = data;

  // page パラメータがない場合は 1 をセット
  const currentPage = parseInt(queryParams.page) || 1;

  const { filterCategory, filterValue } = getFilterInfo(queryParams);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    queryParams.page = newPage;
    navigate(`?${new URLSearchParams(queryParams).toString()}`); // URLが変わる
  };

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
            render={() => (<CryptidCard cryptids={cryptids} />)}
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
};

export default CryptidList;