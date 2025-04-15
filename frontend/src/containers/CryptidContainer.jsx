import React from "react";
import { useParams } from "react-router-dom";
import useCryptid from "../hooks/useCryptid";
import AsyncStateHandler from "../components/AsyncStateHandler";
import CryptidView from "../pages/Cryptid/CryptidView";

const CryptidContainer = () => {
  const { id } = useParams();
  const { data: cryptid, error, loading } = useCryptid(id);

  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => <CryptidView cryptid={cryptid} />}
    />
  );
};

export default CryptidContainer;