import { Die, DieSide, Dot } from "./Dice.styled";

interface DiceProps {
  diceID?: string;
  left?: string;
  top?: string;
}

const Dice = ({ diceID = "one", left = "-150px", top = "0px" }: DiceProps) => {
  return (
    <Die id={`dice-${diceID}`} $leftPos={left} $topPos={top}>
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
