import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  li {
    list-style: none;
  }
`;

export default GlobalStyle;
