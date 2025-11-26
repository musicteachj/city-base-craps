import styled from "styled-components";

export const ControlsContainer = styled.section`
  position: relative;
  background: radial-gradient(circle at top, #166534 0%, #022c22 55%, #020617 100%);
  border-radius: 18px;
  padding: 2.25rem 2.25rem 2rem;
  box-shadow:
    0 22px 45px rgba(0, 0, 0, 0.85),
    0 0 0 1px rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(250, 204, 21, 0.35);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  color: #f9fafb;
  text-align: center;
  margin: 0 0 1.25rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.65),
    0 0 35px rgba(250, 204, 21, 0.35);

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

export const PresetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  justify-content: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const PresetButton = styled.button`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(250, 250, 250, 0.32);
  background: radial-gradient(circle at top, #0f172a 0%, #020617 60%);
  color: #e5e7eb;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(15, 23, 42, 0.9);

  &:hover {
    background: radial-gradient(circle at top, #1d4ed8 0%, #020617 65%);
    border-color: rgba(191, 219, 254, 0.9);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #fbbf24;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.65rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.label`
  display: block;
  color: #e5e7eb;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  font-weight: 500;
  border: 2px solid
    ${(props) =>
      props.$hasError ? "#f87171" : "rgba(248, 250, 252, 0.28)"};
  border-radius: 10px;
  background: radial-gradient(circle at top, #020617 0, #020817 55%);
  color: #f9fafb;
  transition: all 0.3s ease;
  box-sizing: border-box;
  box-shadow:
    inset 0 1px 0 rgba(248, 250, 252, 0.06),
    0 0 0 1px rgba(15, 23, 42, 0.9);

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#f87171" : "#fbbf24")};
    background: radial-gradient(circle at top, #020617 0, #020617 60%);
    box-shadow:
      0 0 0 3px
      ${(props) =>
        props.$hasError
          ? "rgba(248, 113, 113, 0.3)"
          : "rgba(250, 204, 21, 0.32)"},
      inset 0 0 0 1px rgba(15, 23, 42, 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: rgba(148, 163, 184, 0.85);
  }

  /* Remove spinner arrows for number inputs */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  @media (max-width: 768px) {
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: #fca5a5;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StartButton = styled.button`
  width: 100%;
  padding: 0.85rem 1.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: radial-gradient(circle at top, #22c55e 0%, #15803d 55%, #052e16 100%);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(22, 163, 74, 0.85);
  margin-top: 0.25rem;

  &:hover:not(:disabled) {
    background: radial-gradient(circle at top, #4ade80 0%, #16a34a 55%, #052e16 100%);
    transform: translateY(-2px);
    box-shadow:
      0 16px 30px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(34, 197, 94, 0.9);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(22, 163, 74, 0.9);
  }

  &:disabled {
    background: radial-gradient(circle at top, #6b7280 0%, #4b5563 55%, #111827 100%);
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;
