import { CardContainer, CryptidCard, AsyncStateHandler } from "../../components";

const CryptidsListSection = ({ cryptids, loading, error }) => {
  return (
    <CardContainer>
      <AsyncStateHandler
        loading={loading}
        error={error}
        render={() => (<CryptidCard cryptids={cryptids} isNew={false} />)}
      />
    </CardContainer>
  );
};

export default CryptidsListSection;