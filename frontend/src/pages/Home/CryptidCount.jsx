import AsyncStateHandler from "../../components/AsyncStateHandler";

const CryptidCount = ({ loading, error, count }) => {
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => (
        <h4>
          世界各地のUMAをまとめたデータベース 【現在
          <span style={{ fontSize: "120%" }}>{count}</span>件掲載】
        </h4>
      )}
    />
  );
};

export default CryptidCount;
