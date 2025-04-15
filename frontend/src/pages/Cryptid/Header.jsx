import React from "react";
import { HeadPrimary } from "../../components/heads/Heading";

const Header = ({cryptid}) => {
  return (
    <>
      <HeadPrimary>{cryptid ? `${cryptid.name}の情報` : "Loading..."}</HeadPrimary>
      <p style={{ textAlign: 'right', fontSize: '80%' }}>
        登録日：{new Date(cryptid.createdAt).toLocaleDateString()}
      </p>
    </>
  );
};

export default Header;

