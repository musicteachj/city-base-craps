import styled from "styled-components";

/*
const show1 = keyframes`
  100% {
    transform: rotateX(720deg) rotateZ(720deg)
  }
`;
*/

export const Die = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transition: transform 1s;
  left: ${({ $leftPos }) => $leftPos};
  top: ${({ $topPos }) => $topPos};
`;

export const DieSide = styled.div`
  position: absolute;
  background-color: #ffffff;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  border: 1px solid #e5e5e5;
  text-align: center;
  line-height: 6em;

  &:nth-child(1) {
    transform: translateZ(6.2em);
  }

  &:nth-child(2) {
    transform: rotateY(90deg) translateZ(6.2em);
  }

  &:nth-child(3) {
    transform: rotateY(-90deg) translateZ(6.2em);
  }

  &:nth-child(4) {
    transform: rotateX(90deg) translateZ(6.2em);
  }

  &:nth-child(5) {
    transform: rotateX(-90deg) translateZ(6.2em);
  }

  &:nth-child(6) {
    transform: rotateY(-180deg) translateZ(6.2em);
  }
`;

const rowAndColPosValues = {
  one: "20%",
  two: "50%",
  three: "80%"
};

export const Dot = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  margin: -20px 10px 10px -20px;
  border-radius: 20px;
  background-color: #305ec9;
  box-shadow: inset 2px 2px #305ec9;
  top: ${({ row }) => rowAndColPosValues[row]};
  left: ${({ column }) => rowAndColPosValues[column]};
`;