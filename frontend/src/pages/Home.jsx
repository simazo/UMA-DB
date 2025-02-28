import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AREA, SIZE } from "../constants";
import { Section, PaddingBox } from "../components/layouts";
import { ButtonContainer, ButtonWithIcon } from "../components/buttons";
import { Card, CardContainer} from "../components/cards";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import { InputText } from "../components/inputs";
import TextWithIcon from "../components/TextWithIcon";
import imageConfig from "../config/imageConfig";

const Home = () => {
  const navigate = useNavigate();
  const [searchNameText, setSearchNameText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [ latestCryptids, setLatestCryptids ] = useState([]); 
  const [ error, setError ] = useState(null);
  const imageUrl = imageConfig.imageUrl;

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

  useEffect(() => {
    const fetchLatestCryptids = async () => {
      try {

        //最新10件
        const response = await fetch(`${API_BASE_URL}/cryptids?limit=10&sort=-createdAt`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLatestCryptids(data.cryptids);
      } catch (error) {
        console.error("Error fetching latest cryptids:", error);
        setError("データの取得に失敗しました。");
      }
    };

    fetchLatestCryptids();
  }, []);

  return (
    <>
      <Section>
        <HeadPrimary>UMA-DB</HeadPrimary>
      </Section>
      <Section>
        <h4>世界中のUMA情報を集めたデータベース</h4>
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