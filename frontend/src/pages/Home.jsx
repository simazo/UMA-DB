import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AREA, SIZE } from "../constants";
import { Section, PaddingBox } from "../components/layouts";
import { ButtonContainer, ButtonWithIcon } from "../components/buttons";
import { Card, CardContainer} from "../components/cards";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { InputText } from "../components/inputs";
import TextWithIcon from "../components/TextWithIcon";

const Home = () => {
  const navigate = useNavigate();
  const [searchNameText, setSearchNameText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // エリアボタンクリック
  const handleAreaButtonClick = (area) => {
    navigate(`/cryptids?area=${area}`);
  };

  // サイズボタンクリック
  const handleSizeButtonClick = (size) => {
    navigate(`/cryptids?size=${size}`);
  };

  // テキスト入力
  const handleNameTextKeyDown = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault(); // フォーム送信させない
    if (!searchNameText.trim()) return;
    if (event.key === "Enter" && !isComposing) {
      navigate(`/cryptids?name=${encodeURIComponent(searchNameText)}`);
    }
    
  }

  return (
    <>
      <Section>
        <HeadPrimary>UMA-DB</HeadPrimary>
      </Section>
      <Section>
        <h4>世界中のUMA情報を集めたデータベース</h4>
      </Section>
      {/* <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">最近追加されたUMA</TextWithIcon>
        </HeadSecondary>
        <CardContainer>
          <Card 
            imageSrc="image/flogman.jpeg"
            title="カードのタイトル"
            description="これはカードの説明文です。詳細な情報をここに記載します"
            isNew={true}
          />
        </CardContainer>
      </Section> */}
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">目撃エリアから探す</TextWithIcon>
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
          <InputText 
            placeholder="例：ネッシー"
            value={searchNameText}
            onChange={(e) => setSearchNameText(e.target.value)}
            onKeyDown={handleNameTextKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        </PaddingBox>
      </Section>
    </>
  );
};

export default Home;