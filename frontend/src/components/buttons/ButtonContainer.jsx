import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const StyledButtonContainer = styled.div `
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  font-size: 0.75rem;

  @media (min-width: ${breakpoints.sp}) {
    grid-template-columns: repeat(2, 1fr);
    font-size: 0.75rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    font-size: 0.875rem;
  }

  @media (min-width: ${breakpoints.pc}) {
    grid-template-columns: repeat(4, 1fr);
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.wide}) {
    grid-template-columns: repeat(4, 1fr);
    font-size: 1.125rem;
  }
`;

const ButtonContainer = ({children}) => {
  return <StyledButtonContainer>{children}</StyledButtonContainer>
};

export default ButtonContainer;