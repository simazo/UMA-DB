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
  //cursor: pointer;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}; // disabled の場合 cursor を変更
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; // disabled の場合 透明度を下げる
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")}; // disabled の場合、ホバー効果なし
    box-shadow: ${(props) => (props.disabled ? "none" : "0 8px 16px rgba(0, 0, 0, 0.3)")}; // disabled の場合、シャドウなし
  }
`

export default (props) => <BaseButton {...props} />;