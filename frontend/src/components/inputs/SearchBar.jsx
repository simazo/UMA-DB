import React, { useState } from "react";
import InputText from "./InputText";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchNameText, setSearchNameText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || isComposing || !searchNameText.trim()) return;
    event.preventDefault();
    navigate(`/cryptids?name=${encodeURIComponent(searchNameText)}`);
  };

  return (
    <InputText
      placeholder="例：ネッシー"
      value={searchNameText}
      onChange={(e) => setSearchNameText(e.target.value)}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    />
  );
};

export default SearchBar;
