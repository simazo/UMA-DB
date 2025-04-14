import { PaginationContainer, ButtonWithIcon, PaginationInfo } from "../../components";

const Pagination = ({ currentPage, pagination, onPageChange }) => {
  return (
    <PaginationContainer>
      <ButtonWithIcon 
        key="back" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={!pagination.hasPrevPage} 
        iconSrc="image/i-orange-issie.svg"
        alt="前へ戻る"
      >
        前へ
      </ButtonWithIcon>
      <PaginationInfo currentPage={currentPage} totalPages={pagination.totalPages} />
      <ButtonWithIcon 
        key="next" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={!pagination.hasNextPage} 
        iconSrc="image/i-orange-issie.svg" 
        alt="次へ進む"
      >
        次へ
      </ButtonWithIcon>
    </PaginationContainer>
  );
};

export default Pagination;