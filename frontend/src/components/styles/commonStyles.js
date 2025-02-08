import { css } from "styled-components";

export const baseHeaderFooter = css`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.colors.neutral};
  background: ${(props) => props.theme.colors.primary};

  a {
    font-weight: bold;
    font-size: 120%;
    color: ${(props) => props.theme.colors.neutral};
    text-decoration: none;
  }
`;

export default baseHeaderFooter;
