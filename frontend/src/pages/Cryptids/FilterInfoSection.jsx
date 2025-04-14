const FilterInfoSection = ({filterCategory, filterValue}) => {
  return (
    <h4>
      {filterCategory && filterValue
        ? `${filterCategory}: 「${filterValue}」 で絞り込み`
        : "条件なし"}
    </h4>
  );
};

export default FilterInfoSection;