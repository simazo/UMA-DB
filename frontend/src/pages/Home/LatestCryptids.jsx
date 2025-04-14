import AsyncStateHandler from "../../components/AsyncStateHandler";
import { HeadSecondary } from "../../components/heads/Heading";
import TextWithIcon from "../../components/TextWithIcon";
import { CardContainer, CryptidCard} from "../../components/cards";

const LatestCryptids = ({loading, error, cryptids}) => {
  return (
    <>
      <HeadSecondary>
        <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">最近追加されたUMA</TextWithIcon>
      </HeadSecondary>
      <CardContainer>
        <AsyncStateHandler
          loading={loading}
          error={error}
          render={() => (<CryptidCard cryptids={cryptids} isNew={true} />)}
        />
      </CardContainer>
    </>

  );
};

export default LatestCryptids;
