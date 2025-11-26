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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    color: #f8fafc;

    /* Deep casino night backdrop */
    background:
      radial-gradient(circle at top left, #14532d 0, transparent 55%),
      radial-gradient(circle at bottom right, #0f172a 0, #020617 55%);
  }

  #root {
    min-height: 100vh;
  }

  /* Ensure accessibility for keyboard navigation */
  *:focus-visible {
    outline: 2px solid #fbbf24; /* warm casino-gold focus ring */
    outline-offset: 2px;
  }

  /* Hide focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default GlobalStyles;
