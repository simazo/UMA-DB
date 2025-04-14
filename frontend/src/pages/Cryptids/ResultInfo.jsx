import { HeadSecondary, TextWithIcon } from "../../components";

const ResultInfo = ({ cryptids, pagination }) => {
  return (
    <>
      <HeadSecondary>
      <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">
        {cryptids.length === 0
          ? "見つかりませんでした"
          : `${pagination.totalDocs}件のUMAが見つかりました`
        }
      </TextWithIcon>
      </HeadSecondary>
    </>
  );

};

export default ResultInfo;