import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Section, PaddingBox, CardContainer } from "../components/layout";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { AREA, SIZE } from "../constants";
import { Card } from "../components/cards";
import TextWithIcon from "../components/TextWithIcon";

const CryptidList = () => {
  const [ cryptids, setCryptids ] = useState([]); 
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const area = params.get("area");
  const size = params.get("size");
  const name = params.get("name");
  
  // どのクエリが渡ってきているか判定（いずれか1つのみ）
  const queryKey = area ? "area" : size ? "size" : name ? "name" : null;
  const queryValue = area || size || name;

  const filterCategory = queryKey === "area"
    ? "目撃エリア"
    : queryKey === "size"
    ? "サイズ"
    : queryKey === "name"
    ? "名前"
    : "";

  const filterValue =
    queryKey === "area"
      ? AREA.find((a) => a.id === Number(area))?.alt || "不明なエリア"
      : queryKey === "size"
      ? SIZE.find((s) => s.id === size)?.alt || "不明なサイズ"
      : queryKey === "name"
      ? name
      : "";
  
  useEffect(() => {
    if (!queryKey || !queryValue) return;

    fetch(`http://localhost:8080/cryptids?${queryKey}=${queryValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCryptids(data))
      .catch((error) => {
        console.error("Error fetching cryptids:", error);
        setError("データの取得に失敗しました。");
      });
  }, [queryKey, queryValue]);

  return (
    <>
      <Section>
        <HeadPrimary>UMA一覧</HeadPrimary>
      </Section>
      <Section>
        <h4>
          { queryKey && filterValue 
          ? `${filterCategory}: ${filterValue}`
          : "条件なし" }
        </h4>
      </Section>
      <Section>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <HeadSecondary>
        <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">{cryptids.length}体</TextWithIcon>
        </HeadSecondary>
        <CardContainer>
          {cryptids.map((cryptid) => (
            <Card
              key={cryptid._id}
              imageSrc={`image/cryptids/${cryptid.id}/thumbnail.jpeg`}
              title={cryptid.name}
              description={`${cryptid.description.slice(0, 40)}...`}
              />
          ))}
        </CardContainer>
      </Section>
    </>
  );
};

export default CryptidList;