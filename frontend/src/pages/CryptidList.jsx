import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Section, PaddingBox } from "../components/layouts";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { AREA, SIZE } from "../constants";
import { Card, CardContainer } from "../components/cards";
import TextWithIcon from "../components/TextWithIcon";
import imageConfig from "../config/imageConfig";
import { PaginationContainer, PaginationInfo } from "../components/paginations";
import { ButtonWithIcon } from "../components/buttons";

const CryptidList = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [ cryptids, setCryptids ] = useState([]);
  const [ pagination, setPagination ] = useState({
    totalDocs: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });  
  const [ error, setError ] = useState(null);
  const imageUrl = imageConfig.imageUrl;

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  
  // クエリパラメータの取得
  const queryParams = {};
  ["area", "size", "name", "sort", "limit", "page"].forEach((key) => {
    const value = params.get(key);
    if (value) queryParams[key] = value;
  });

  // page パラメータがない場合は 1 をセット
  const currentPage = parseInt(queryParams.page) || 1;

  // フィルターの表示用情報
  const filterCategory = queryParams.area
    ? "目撃エリア"
    : queryParams.size
    ? "サイズ"
    : queryParams.name
    ? "名前"
    : "";

  const filterValue = queryParams.area
    ? AREA.find((a) => a.id === Number(queryParams.area))?.alt || "不明なエリア"
    : queryParams.size
    ? SIZE.find((s) => s.id === queryParams.size)?.alt || "不明なサイズ"
    : queryParams.name
    ? queryParams.name
    : "";

  const fetchCryptids = async (page = 1) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(`${API_BASE_URL}/cryptids?${queryString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCryptids(data.cryptids);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching cryptids:", error);
      setError("データの取得に失敗しました。");
    }
  };

  useEffect(() => {
    fetchCryptids(pagination.currentPage);
  }, [location.search]); // URLが変わる度に再実行

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
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <HeadSecondary>
        <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">
          {cryptids.length === 0
            ? "見つかりませんでした"
            : `${pagination.totalDocs}件のUMAが見つかりました`
          }
        </TextWithIcon>
        </HeadSecondary>
        <CardContainer>
          {cryptids.map((cryptid) => (
            <Card
              key={cryptid._id}
              imageSrc={`${imageUrl}/${cryptid.id}/thumbnail.jpeg`}
              title={cryptid.name}
              description={`${cryptid.description.slice(0, 40)}...`}
              to={`/cryptids/${cryptid._id}`}
              />
          ))}
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