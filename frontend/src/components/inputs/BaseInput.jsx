import styled from "styled-components";

const BaseInput = styled.input `
  display: block;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.$bgColor || props.theme.colors.background};
  color: ${(props) => props.$textColor || props.theme.colors.primary};
  border: 2px solid ${(props) => props.$borderColor || props.theme.colors.primary};
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: ${(props) => props.$focusBorderColor || props.theme.colors.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.$textColor || props.theme.colors.primary};
  }
`

export default BaseInput;