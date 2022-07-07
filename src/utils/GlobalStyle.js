import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #ffffff;
  font-family: 'Raleway', sans-serif;
}

html{
  color: #000000;
  background-color: #000000;
}
`;

export default GlobalStyle;
