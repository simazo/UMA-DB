import { useLatestCryptids, useCryptidCount, useHandleSearch } from "../hooks";
import Page from "../pages/Home/Page";

const HomeContainer = () => {
  const handleSearch = useHandleSearch(); 
  const { data: cryptids, error: cryptidsError, loading: cryptidsLoading } = useLatestCryptids();
  const { data: cryptidCount, error: countError, loading: countLoading } = useCryptidCount();

  return (
    <Page
      handleSearch={handleSearch}
      cryptids={cryptids}
      cryptidsError={cryptidsError}
      cryptidsLoading={cryptidsLoading}
      cryptidCount={cryptidCount}
      countError={countError}
      countLoading={countLoading}
    />
  );
};

export default HomeContainer;