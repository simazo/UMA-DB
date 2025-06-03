const FilterInfo = ({filterCategory, filterValue, filterNote}) => {
  return (
    <>
      <h4>
        {filterCategory && filterValue
          ? `${filterCategory}: 「${filterValue}」 で絞り込み`
          : "条件なし"}
      </h4>
      {filterNote && <p>{filterNote}</p>}
    </>
  );
};

export default FilterInfo;