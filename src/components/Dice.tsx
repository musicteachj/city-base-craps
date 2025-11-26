import { Die, DieSide, Dot } from "./Dice.styled";

interface DiceProps {
  value?: number; // 1-6, the face value to display
  diceID?: string;
  left?: string;
  top?: string;
}

const Dice = ({ value = 1, diceID = "one", left = "-150px", top = "0px" }: DiceProps) => {
  // Calculate the rotation needed to show the correct face
  const getRotation = (faceValue: number): string => {
    switch (faceValue) {
      case 1:
        return "rotateX(0deg) rotateY(0deg)"; // Front face
      case 2:
        return "rotateX(0deg) rotateY(-90deg)"; // Right face
      case 3:
        return "rotateX(0deg) rotateY(90deg)"; // Left face
      case 4:
        return "rotateX(-90deg) rotateY(0deg)"; // Top face
      case 5:
        return "rotateX(90deg) rotateY(0deg)"; // Bottom face
      case 6:
        return "rotateX(0deg) rotateY(180deg)"; // Back face
      default:
        return "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <Die
      id={`dice-${diceID}`}
      $leftPos={left}
      $topPos={top}
      style={{ transform: getRotation(value) }}
    >
      <DieSide id={`dice-${diceID}-side-one`}>
        <Dot row="two" column="two" />
      </DieSide>
      <DieSide id={`dice-${diceID}-side-two`}>
        <Dot row="one" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceID}-side-three`}>
        <Dot row="one" column="one" />
        <Dot row="two" column="two" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceID}-side-four`}>
        <Dot row="one" column="one" />
        <Dot row="one" column="three" />
        <Dot row="three" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceID}-side-five`}>
        <Dot row="one" column="one" />
        <Dot row="one" column="three" />
        <Dot row="two" column="two" />
        <Dot row="three" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceID}-side-six`}>
        <Dot row="one" column="one" />
        <Dot row="one" column="three" />
        <Dot row="two" column="one" />
        <Dot row="two" column="three" />
        <Dot row="three" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
    </Die>
  );
};

export default Dice;
