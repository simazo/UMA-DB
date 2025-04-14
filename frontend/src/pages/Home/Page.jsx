import { AREA, SIZE, REGION, UMA_TYPE } from "../../constants";
import { Section } from "../../components/layouts";
import { HeadPrimary } from "../../components/heads/Heading";
import SearchSection from "../../components/SearchSection";
import CryptidCount from "./CryptidCount";
import LatestCryptids from "./LatestCryptids";
import NameSearch from "./NameSearch";

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
        <CryptidCount
          loading={countLoading}
          error={countError}
          count={cryptidCount}
        />
      </Section>
      <Section>
        <LatestCryptids
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
        <NameSearch />
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
