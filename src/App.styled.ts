import styled from "styled-components";

export const AppContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  min-height: 100vh;
  width: 100vw;
  background:
    radial-gradient(circle at top, #14532d 0, rgba(15, 23, 42, 0.85) 45%),
    radial-gradient(circle at bottom, #020617 0, #020617 55%);
  box-sizing: border-box;
  padding: 2.5rem 3rem;
  overflow-y: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem 2.5rem;
  }
`;
