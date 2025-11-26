import styled, { keyframes } from "styled-components";

type DiceRowOrColumn = "one" | "two" | "three";

const rollAnimation = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0deg) scale(1);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.55);
  }
  45% {
    transform: rotateX(540deg) rotateY(360deg) scale(1.08);
    box-shadow: 0 18px 32px rgba(0, 0, 0, 0.85);
  }
  100% {
    transform: var(--final-transform);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.85);
  }
`;

export const Die = styled.div<{
  $leftPos?: string;
  $topPos?: string;
  $finalTransform: string;
}>`
  position: relative;
  width: 34px;
  height: 34px;
  transform-style: preserve-3d;
  perspective: 260px;
  transition: transform 0.4s ease-out;
  left: ${({ $leftPos }) => $leftPos ?? "0px"};
  top: ${({ $topPos }) => $topPos ?? "0px"};
  --final-transform: ${({ $finalTransform }) => $finalTransform};
  transform: var(--final-transform);
  animation: ${rollAnimation} 0.9s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const DieSide = styled.div`
  position: absolute;
  background-color: #ffffff;
  border-radius: 7px;
  width: 34px;
  height: 34px;
  border: 1px solid #e5e5e5;
  text-align: center;
  transform-style: preserve-3d;

  &:nth-child(1) {
    /* One (front) */
    transform: translateZ(17px);
  }

  &:nth-child(2) {
    /* Two (right) */
    transform: rotateY(90deg) translateZ(17px);
  }

  &:nth-child(3) {
    /* Three (left) */
    transform: rotateY(-90deg) translateZ(17px);
  }

  &:nth-child(4) {
    /* Four (top) */
    transform: rotateX(90deg) translateZ(17px);
  }

  &:nth-child(5) {
    /* Five (bottom) */
    transform: rotateX(-90deg) translateZ(17px);
  }

  &:nth-child(6) {
    /* Six (back) */
    transform: rotateY(-180deg) translateZ(17px);
  }
`;

const rowAndColPosValues: Record<DiceRowOrColumn, string> = {
  one: "22%",
  two: "50%",
  three: "78%",
};

export const Dot = styled.div<{
  row: DiceRowOrColumn;
  column: DiceRowOrColumn;
}>`
  position: absolute;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #111827 0, #020617 80%);
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.6),
    0 0 4px rgba(15, 23, 42, 0.85);
  top: ${({ row }) => rowAndColPosValues[row]};
  left: ${({ column }) => rowAndColPosValues[column]};
`;
