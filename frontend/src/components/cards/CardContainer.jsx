import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const StyledCardContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: ${breakpoints.sp}) {
    //grid-template-columns: repeat(2, 1fr); /* 2列 */
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr); /* 3列 */
  }

  @media (min-width: ${breakpoints.pc}) {
    grid-template-columns: repeat(4, 1fr); /* 4列 */
  }

  @media (min-width: ${breakpoints.wide}) {
    grid-template-columns: repeat(5, 1fr); /* 5列 */
  }
`;

const CardContainer = ({ children }) => {
  return (
    <StyledCardContainer>
      {children}
    </StyledCardContainer>
  );
};

export default CardContainer;
