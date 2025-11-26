import styled from "styled-components";

export const DisplayContainer = styled.section`
  background: rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 100%;
    margin: 1.5rem auto 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1.5rem auto 0;
  }
`;

export const BankrollStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
  }
`;

export const BankrollLabel = styled.span`
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const BankrollValue = styled.span`
  color: #4caf50;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
`;

export const GameLog = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;

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
    padding: 0.75rem;
    max-height: 350px;
  }
`;

export const LogEntry = styled.div<{ $type: string }>`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const DiceDisplay = styled.div`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
  font-family: "Courier New", monospace;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
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
  font-size: 0.85rem;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.8rem;
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
  margin: 1rem 0;

  @media (max-width: 768px) {
    margin: 0.85rem 0;
  }
`;

export const ResultsSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.85rem;
  }
`;

export const ResultsTitle = styled.h2`
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ResultsItem = styled.div<{ $type?: "win" | "lose" }>`
  color: ${(props) => {
    if (props.$type === "win") return "#81C784";
    if (props.$type === "lose") return "#E57373";
    return "#fff";
  }};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }
`;

export const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-align: center;
  padding: 2rem 1.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 1.5rem 1rem;
  }
`;
