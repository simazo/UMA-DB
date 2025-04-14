import { AREA, SIZE, REGION, UMA_TYPE } from "../../constants";
import { Section } from "../../components/layouts";
import { HeadPrimary } from "../../components/heads/Heading";
import SearchSection from "../../components/SearchSection";
import CryptidCountSection from "./CryptidCountSection";
import LatestCryptidsSection from "./LatestCryptidsSection";
import NameSearchSection from "./NameSearchSection";

const HomePage = ({
  handleSearch,
  cryptids,
  cryptidsError,
  cryptidsLoading,
  cryptidCount,
  countError,
  countLoading,
}) => {
  return (
    <>
      <Section>
        <HeadPrimary>UMA-DB</HeadPrimary>
      </Section>
      <Section>
        <CryptidCountSection
          loading={countLoading}
          error={countError}
          count={cryptidCount}
        />
      </Section>
      <Section>
        <LatestCryptidsSection
          loading={cryptidsLoading}
          error={cryptidsError}
          cryptids={cryptids}
        />
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
        <NameSearchSection />
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

export default HomePage;
