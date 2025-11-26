import styled from "styled-components";

export const AppContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  min-height: 100vh;
  width: 100vw;
  background-color: #b2cbdd;
  box-sizing: border-box;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;
