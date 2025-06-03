import { AREA, REGION, UMA_TYPE, SIZE } from "../constants";

const filterMapping = [
  { key: "area", label: "生息場所", source: AREA },
  { key: "region", label: "生息地域", source: REGION },
  { key: "uma_type", label: "UMA的分類", source: UMA_TYPE },
  { key: "size", label: "サイズ", source: SIZE },
  { key: "name", label: "名前", source: null },
];

export const getFilterInfo = (queryParams) => {
  const filter = filterMapping.find(({ key }) => queryParams[key]);
  const filterCategory = filter?.label || "";

  if (!filter) {
    return { filterCategory: "", filterValue: "", filterNote: "" };
  }

  if (!filter.source) {
    return {
      filterCategory,
      filterValue: queryParams[filter.key],
      filterNote: "",
    };
  }

  const targetId = filter.key === "size"
    ? queryParams[filter.key]
    : Number(queryParams[filter.key]);

  const matched = filter.source.find((item) => item.id === targetId);

  return {
    filterCategory,
    filterValue: matched?.alt || `不明な${filter.label}`,
    filterNote: matched?.note || "",
  };
};