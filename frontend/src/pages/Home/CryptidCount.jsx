import AsyncStateHandler from "../../components/AsyncStateHandler";

const CryptidCount = ({ loading, error, count }) => {
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => (
        <h4>
          世界のUMA情報をまとめたデータベース 【{count}件掲載中】
        </h4>
      )}
    />
  );
};

export default CryptidCount;
