import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    background-repeat: no-repeat;
  }

  body {
    margin: 0;
    padding: 0;
    //line-height: 1.6;
    font-family: ${({ theme }) => theme.typography.fontYuMincho};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  h1, h2, h3, h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
  }
`;

export default GlobalStyle;