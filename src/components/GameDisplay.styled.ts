import styled from "styled-components";

export const DisplayContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin: 2rem auto 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

export const BankrollStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

export const BankrollLabel = styled.span`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const BankrollValue = styled.span`
  color: #4CAF50;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const GameLog = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 1.5rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    max-height: 400px;
  }
`;

export const LogEntry = styled.div<{ $type: string }>`
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  background: ${(props) => {
    switch (props.$type) {
      case "win":
        return "rgba(76, 175, 80, 0.15)";
      case "lose":
        return "rgba(244, 67, 54, 0.15)";
      case "point":
        return "rgba(255, 193, 7, 0.15)";
      case "game-start":
      case "game-end":
        return "rgba(33, 150, 243, 0.15)";
      default:
        return "rgba(255, 255, 255, 0.05)";
    }
  }};
  border-left: 3px solid
    ${(props) => {
      switch (props.$type) {
        case "win":
          return "#4CAF50";
        case "lose":
          return "#f44336";
        case "point":
          return "#FFC107";
        case "game-start":
        case "game-end":
          return "#2196F3";
        default:
          return "rgba(255, 255, 255, 0.2)";
      }
    }};

  @media (max-width: 768px) {
    padding: 0.65rem;
    margin-bottom: 0.65rem;
  }
`;

export const DiceContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  /* Make dice smaller in the log */
  & > div {
    transform: scale(0.5);
    transform-origin: left center;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    
    & > div {
      transform: scale(0.4);
    }
  }
`;

export const LogMessage = styled.p<{ $type: string }>`
  margin: 0;
  color: ${(props) => {
    switch (props.$type) {
      case "win":
        return "#81C784";
      case "lose":
        return "#E57373";
      case "point":
        return "#FFD54F";
      default:
        return "#fff";
    }
  }};
  font-size: 0.95rem;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const Separator = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    margin: 1.25rem 0;
  }
`;

export const ResultsSummary = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const ResultsTitle = styled.h2`
  color: #fff;
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ResultsItem = styled.div<{ $type?: "win" | "lose" }>`
  color: ${(props) => {
    if (props.$type === "win") return "#81C784";
    if (props.$type === "lose") return "#E57373";
    return "#fff";
  }};
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.65rem;
  }
`;

export const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.25rem;
  text-align: center;
  padding: 3rem 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 2rem 1.5rem;
  }
`;

