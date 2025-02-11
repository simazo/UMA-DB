import styled from "styled-components";

const BaseButton = styled.button `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 140px;
  max-width: 320px;
  width: 100%;
  background-color: ${(props) => props.$bgColor || props.theme.colors.primary};
  color: ${(props) => props.$textColor || props.theme.colors.primary};
  border: 2px solid ${(props) => props.$borderColor || props.theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 100vh;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`

export default (props) => <BaseButton {...props} />;