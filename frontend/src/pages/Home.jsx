import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AREA, SIZE, REGION, UMA_TYPE } from "../constants";
import { Section, PaddingBox } from "../components/layouts";
import { ButtonContainer, ButtonWithIcon } from "../components/buttons";
import { Card, CardContainer} from "../components/cards";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import TextWithIcon from "../components/TextWithIcon";
import imageConfig from "../config/imageConfig";
import useCryptidData from "../hooks/useCryptidData";
import SearchBar from "../components/inputs/SearchBar";

const Home = () => {
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { latestCryptids, count, error } = useCryptidData(process.env.REACT_APP_API_BASE_URL);
  const imageUrl = imageConfig.imageUrl;

  // UMA的分類ボタンクリック
  const handleUmaTypeButtonClick = (uma_type) => {
    navigate(`/cryptids?uma_type=${uma_type}`);
  };

  // 地域ボタンクリック
  const handleRegionButtonClick = (region) => {
    navigate(`/cryptids?region=${region}`);
  };

  // エリアボタンクリック
  const handleAreaButtonClick = (area) => {
    navigate(`/cryptids?area=${area}`);
  };

  // サイズボタンクリック
  const handleSizeButtonClick = (size) => {
    navigate(`/cryptids?size=${size}`);
  };

  return (
    <>
      <Section>
        <HeadPrimary>UMA-DB</HeadPrimary>
      </Section>
      <Section>
        <h4>世界中のUMA情報を集めたデータベース 【現在:<span style={{ fontSize: "120%" }}>{count}</span>件】</h4>
      </Section>
      <Section>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">最近追加されたUMA</TextWithIcon>
        </HeadSecondary>
        <CardContainer>
          {latestCryptids.map((cryptid) => (
            <Card
              key={cryptid._id}
              imageSrc={`${imageUrl}/${cryptid.id}/thumbnail.jpeg`}
              title={cryptid.name}
              description={`${cryptid.description.slice(0, 40)}...`}
              isNew={true}
              to={`/cryptids/${cryptid._id}`}
              />
          ))}
        </CardContainer>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">生息場所から探す</TextWithIcon>
        </HeadSecondary>
        <ButtonContainer>
          {AREA.map(({ id, icon, alt }) => (
            <ButtonWithIcon key={id} onClick={() => handleAreaButtonClick(id)} iconSrc={icon} alt={alt}>
              {alt}
            </ButtonWithIcon>
          ))}
        </ButtonContainer>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">サイズから探す</TextWithIcon>
        </HeadSecondary>
        <ButtonContainer>
          {SIZE.map(({ id, icon, alt }) => (
            <ButtonWithIcon key={id} onClick={() => handleSizeButtonClick(id)} iconSrc={icon} alt={alt}>
              {alt}
            </ButtonWithIcon>
          ))}
        </ButtonContainer>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">名前から探す</TextWithIcon>
        </HeadSecondary>
        <PaddingBox>
          <SearchBar />
        </PaddingBox>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">生息地域から探す</TextWithIcon>
        </HeadSecondary>
        <ButtonContainer>
          {REGION.map(({ id, icon, alt }) => (
            <ButtonWithIcon key={id} onClick={() => handleRegionButtonClick(id)} iconSrc={icon} alt={alt}>
              {alt}
            </ButtonWithIcon>
          ))}
        </ButtonContainer>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">UMA的分類から探す</TextWithIcon>
        </HeadSecondary>
        <ButtonContainer>
          {UMA_TYPE.map(({ id, icon, alt }) => (
            <ButtonWithIcon key={id} onClick={() => handleUmaTypeButtonClick(id)} iconSrc={icon} alt={alt}>
              {alt}
            </ButtonWithIcon>
          ))}
        </ButtonContainer>
      </Section>
    </>
  );
};

export default Home;