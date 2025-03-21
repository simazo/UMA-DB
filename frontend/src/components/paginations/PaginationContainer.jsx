import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const StyledPaginationContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  font-size: 1.2rem;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
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