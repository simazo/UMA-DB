import React from "react";
import { useParams } from "react-router-dom";
import useCryptid from "../hooks/useCryptid";
import AsyncStateHandler from "../components/AsyncStateHandler";
import Page from "../pages/Cryptid/Page";

const CryptidContainer = () => {
  const { id } = useParams();
  const { data: cryptid, error, loading } = useCryptid(id);

  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => <Page cryptid={cryptid} />}
    />
  );
};

export default CryptidContainer;