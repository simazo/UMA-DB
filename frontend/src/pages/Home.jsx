
import { AREA, SIZE, REGION, UMA_TYPE } from "../constants";
import { Section, PaddingBox } from "../components/layouts";
import { CardContainer, CryptidCard} from "../components/cards";
import { HeadPrimary, HeadSecondary } from "../components/heads/Heading";
import TextWithIcon from "../components/TextWithIcon";
import AsyncStateHandler from "../components/AsyncStateHandler";
import { useLatestCryptids, useCryptidCount } from "../hooks";
import SearchBar from "../components/inputs/SearchBar";
import useHandleSearch from "../hooks/useHandleSearch"
import SearchSection from "../components/SearchSection";
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
        <SearchSection
          title="生息場所から探す"
          dataList={AREA}
          searchKey="area"
          onSearch={handleSearch}
        />
      </Section>
      <Section>
        <SearchSection
          title="サイズから探す"
          dataList={SIZE}
          searchKey="size"
          onSearch={handleSearch}
        />
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
        <SearchSection
          title="生息地域から探す"
          dataList={REGION}
          searchKey="region"
          onSearch={handleSearch}
        />
      </Section>
      <Section>
        <SearchSection
          title="UMA的分類から探す"
          dataList={UMA_TYPE}
          searchKey="uma_type"
          onSearch={handleSearch}
        />
      </Section>
    </>
  );
};

export default Home;