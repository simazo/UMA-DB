import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const StyledPaginationContainer = styled.div `
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.75rem;

  @media (min-width: ${breakpoints.sp}) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  @media (min-width: ${breakpoints.pc}) {
    font-size: 1rem;
    padding: 0.75rem 1.25rem;
  }

  @media (min-width: ${breakpoints.wide}) {
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
  }
`;

const PaginationContainer = ({children}) => {
  return <StyledPaginationContainer>{children}</StyledPaginationContainer>
};

export default PaginationContainer;