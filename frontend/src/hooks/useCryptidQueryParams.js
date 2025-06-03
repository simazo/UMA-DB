import { useLocation } from "react-router-dom";
import { extractQueryParams, getFilterInfo } from "../utils";

const validKeys = [
  "area", 
  "size", 
  "name", 
  "region", 
  "uma_type", 
  "sort", 
  "limit", 
  "page"
];

const useCryptidQueryParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParams = extractQueryParams(validKeys, params);

  if (!queryParams.page) {
    queryParams.page = "1";
  }

  const { filterCategory, filterValue, filterNote } = getFilterInfo(queryParams);

  return {
    queryParams,
    filterCategory,
    filterValue,
    filterNote
  };
};

export default useCryptidQueryParams;