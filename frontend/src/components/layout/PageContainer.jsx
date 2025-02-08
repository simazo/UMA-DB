import styled from "styled-components";

const StyledPageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const PageContainer = ({ children }) => {
  return (
    <StyledPageContainer>
      {children}
    </StyledPageContainer>
  );
};

export default PageContainer;
