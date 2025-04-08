import { useNavigate } from "react-router-dom";

const useHandleSearch = () => {
  const navigate = useNavigate();

  const handleButtonClick = (paramKey, paramValue) => {
    navigate(`/cryptids?${paramKey}=${paramValue}`);
  };

  return handleButtonClick;
};

export default useHandleSearch;