import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }

  /* Ensure accessibility for keyboard navigation */
  *:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
  }

  /* Hide focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default GlobalStyles;

