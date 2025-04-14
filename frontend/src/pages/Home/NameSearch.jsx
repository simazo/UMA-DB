import { HeadSecondary } from "../../components/heads/Heading";
import SearchBar from "../../components/inputs/SearchBar";
import { PaddingBox } from "../../components/layouts";
import TextWithIcon from "../../components/TextWithIcon";

const NameSearch = () => {
  return (
    <>
      <HeadSecondary>
        <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">名前から探す</TextWithIcon>
      </HeadSecondary>
      <PaddingBox>
        <SearchBar />
      </PaddingBox>
    </>
  );
};

export default NameSearch;