import AsyncStateHandler from "../../components/AsyncStateHandler";

const CryptidCountSection = ({ loading, error, count }) => {
  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => (
        <h4>
          世界中のUMA情報を集めたデータベース 【現在:{" "}
          <span style={{ fontSize: "120%" }}>{count}</span>件】
        </h4>
      )}
    />
  );
};

export default CryptidCountSection;
