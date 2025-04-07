
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

const CryptidList = () => {  
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const queryParams = {};
  ["area", "size", "name", "region", "uma_type", "sort", "limit", "page"].forEach((key) => {
    const value = params.get(key);
    if (value) queryParams[key] = value;
  });

  if (!queryParams.page) {
    queryParams.page = "1";
  }

  const { data, error, loading } = useCryptids(API_BASE_URL, queryParams);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const { cryptids, pagination } = data;

  // page パラメータがない場合は 1 をセット
  const currentPage = parseInt(queryParams.page) || 1;

  // フィルターの表示用情報
  const filterCategory = queryParams.area
    ? "生息場所"
    : queryParams.region
    ? "生息地域"
    : queryParams.uma_type
    ? "UMA的分類"
    : queryParams.size
    ? "サイズ"
    : queryParams.name
    ? "名前"
    : "";

  const filterValue = queryParams.area
    ? AREA.find((a) => a.id === Number(queryParams.area))?.alt || "不明な生息場所"
    : queryParams.region
    ? REGION.find((r) => r.id === Number(queryParams.region))?.alt || "不明な生息地域"
    : queryParams.uma_type
    ? UMA_TYPE.find((u) => u.id === Number(queryParams.uma_type))?.alt || "不明なUMA的分類"
    : queryParams.size
    ? SIZE.find((s) => s.id === queryParams.size)?.alt || "不明なサイズ"
    : queryParams.name
    ? queryParams.name
    : "";

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