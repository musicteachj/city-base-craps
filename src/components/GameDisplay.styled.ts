import styled, { keyframes } from "styled-components";

const rollAnimation = keyframes`
  0% {
    transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
    filter: brightness(1);
  }
  18% {
    transform: translateY(-6px) rotateX(140deg) rotateY(45deg) scale(1.05);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.9);
    filter: brightness(1.05);
  }
  45% {
    transform: translateY(4px) rotateX(260deg) rotateY(-30deg) scale(0.98);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.85);
    filter: brightness(0.98);
  }
  75% {
    transform: translateY(-2px) rotateX(330deg) rotateY(15deg) scale(1.03);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.9);
    filter: brightness(1.04);
  }
  100% {
    transform: translateY(0) rotateX(360deg) rotateY(0deg) scale(1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
    filter: brightness(1);
  }
`;

export const DisplayContainer = styled.section`
  position: relative;
  background: radial-gradient(circle at top, #0f172a 0%, #020617 55%);
  border-radius: 18px;
  padding: 1.75rem 1.75rem 1.5rem;
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.55);
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
  background: linear-gradient(
    135deg,
    rgba(15, 118, 110, 0.5),
    rgba(8, 47, 73, 0.95)
  );
  border-radius: 12px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
  }
`;

export const BankrollLabel = styled.span`
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const BankrollValue = styled.span`
  color: #22c55e;
  font-size: 1.6rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), 0 0 22px rgba(34, 197, 94, 0.55);

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
`;

export const GameLog = styled.div`
  background: radial-gradient(circle at top, #020617 0%, #020617 55%);
  border-radius: 12px;
  padding: 1rem 0.9rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 1px solid rgba(30, 64, 175, 0.8);

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
  border-radius: 10px;
  background: ${(props) => {
    switch (props.$type) {
      case "win":
        return "rgba(22, 163, 74, 0.16)";
      case "lose":
        return "rgba(248, 113, 113, 0.16)";
      case "point":
        return "rgba(250, 204, 21, 0.18)";
      case "game-start":
      case "game-end":
        return "rgba(59, 130, 246, 0.16)";
      default:
        return "rgba(15, 23, 42, 0.6)";
    }
  }};
  border-left: 3px solid
    ${(props) => {
      switch (props.$type) {
        case "win":
          return "#22C55E";
        case "lose":
          return "#f97373";
        case "point":
          return "#FBBF24";
        case "game-start":
        case "game-end":
          return "#60A5FA";
        default:
          return "rgba(148, 163, 184, 0.65)";
      }
    }};

  @media (max-width: 768px) {
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const DiceDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(248, 250, 252, 0.98);
  background: linear-gradient(
    135deg,
    rgba(15, 118, 110, 0.2),
    rgba(15, 23, 42, 0.95)
  );
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  margin-bottom: 0.35rem;
  font-family: "Courier New", monospace;
  border: 1px solid rgba(56, 189, 248, 0.6);
`;

export const DiceFace = styled.div`
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 10px;
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0,
    #e5e7eb 40%,
    #d1d5db 100%
  );
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 0.18rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
  transform-style: preserve-3d;
  animation: ${rollAnimation} 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, box-shadow, filter;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
`;

export const DicePip = styled.span<{ $visible: boolean }>`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 999px;
  margin: auto;
  background: ${(props) =>
    props.$visible
      ? "radial-gradient(circle, #0f172a 0, #020617 85%)"
      : "transparent"};
  box-shadow: ${(props) =>
    props.$visible ? "0 0 4px rgba(0, 0, 0, 0.8)" : "none"};
`;

export const DiceTotal = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #e5e7eb;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
`;

export const LogMessage = styled.p<{ $type: string }>`
  margin: 0;
  color: ${(props) => {
    switch (props.$type) {
      case "win":
        return "#bbf7d0";
      case "lose":
        return "#fecaca";
      case "point":
        return "#fde68a";
      default:
        return "#e5e7eb";
    }
  }};
  font-size: 0.85rem;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

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
  background: linear-gradient(
    145deg,
    rgba(15, 118, 110, 0.3),
    rgba(15, 23, 42, 0.95)
  );
  border-radius: 12px;
  padding: 1.05rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.65);

  @media (max-width: 768px) {
    padding: 0.85rem;
  }
`;

export const ResultsTitle = styled.h2`
  color: #f9fafb;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.75), 0 0 18px rgba(250, 204, 21, 0.35);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ResultsItem = styled.div<{ $type?: "win" | "lose" }>`
  color: ${(props) => {
    if (props.$type === "win") return "#bbf7d0";
    if (props.$type === "lose") return "#fecaca";
    return "#e5e7eb";
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
