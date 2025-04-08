
import { AREA, SIZE, REGION, UMA_TYPE } from "../constants";
import { Section, PaddingBox } from "../components/layouts";
import { ButtonContainer, ButtonWithIcon } from "../components/buttons";
import { CardContainer, CryptidCard} from "../components/cards";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import TextWithIcon from "../components/TextWithIcon";
import AsyncStateHandler from "../components/AsyncStateHandler";
import { useLatestCryptids, useCryptidCount } from "../hooks";
import SearchBar from "../components/inputs/SearchBar";
import useHandleSearch from "../hooks/useHandleSearch"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {
  const handleSearch = useHandleSearch(); 
  const { data: cryptids, error: cryptidsError, loading: cryptidsLoading } = useLatestCryptids(API_BASE_URL);
  const { data: cryptidCount, error: countError, loading: countLoading } = useCryptidCount(API_BASE_URL);

  return (
    <>
      <Section>
        <HeadPrimary>UMA-DB</HeadPrimary>
      </Section>
      <Section>
        <AsyncStateHandler
          loading={countLoading}
          error={countError}
          render={() => (
            <h4>
              世界中のUMA情報を集めたデータベース 【現在:{" "}
              <span style={{ fontSize: "120%" }}>{cryptidCount}</span>件】
            </h4>
          )}
        />
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">最近追加されたUMA</TextWithIcon>
        </HeadSecondary>
        <CardContainer>
          <AsyncStateHandler
            loading={cryptidsLoading}
            error={cryptidsError}
            render={() => (<CryptidCard cryptids={cryptids} isNew={true} />)}
          />
        </CardContainer>
      </Section>
      <Section>
        <HeadSecondary>
          <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">生息場所から探す</TextWithIcon>
        </HeadSecondary>
        <ButtonContainer>
          {AREA.map(({ id: areaId, icon, alt }) => (
            <ButtonWithIcon key={areaId} onClick={() => handleSearch("area", areaId)} iconSrc={icon} alt={alt}>
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
          {SIZE.map(({ id: sizeId, icon, alt }) => (
            <ButtonWithIcon key={sizeId} onClick={() => handleSearch("size", sizeId)} iconSrc={icon} alt={alt}>
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
          {REGION.map(({ id: regionId, icon, alt }) => (
            <ButtonWithIcon key={regionId} onClick={() => handleSearch("region", regionId)} iconSrc={icon} alt={alt}>
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
          {UMA_TYPE.map(({ id: umaTypeId, icon, alt }) => (
            <ButtonWithIcon key={umaTypeId} onClick={() => handleSearch("uma_type", umaTypeId)} iconSrc={icon} alt={alt}>
              {alt}
            </ButtonWithIcon>
          ))}
        </ButtonContainer>
      </Section>
    </>
  );
};

export default Home;