import styled from "styled-components";

const StyledPaginationInfo = styled.div`
  padding-top: 1rem;
  margin: 0 1rem;
`;

const PaginationInfo = ({ currentPage, totalPages }) => {
  return (
    <StyledPaginationInfo>
      {currentPage} / {totalPages}
    </StyledPaginationInfo>
  );
};

export default PaginationInfo;