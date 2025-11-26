import { Die, DieSide, Dot } from "./Dice.styled";

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

interface DiceProps {
  /** Value to display on the die (will be clamped between 1 and 6) */
  value: number;
  /** Optional id suffix so multiple dice can coexist without duplicate ids */
  diceId?: string;
  /** Optional left offset (kept for compatibility with the original API) */
  left?: string;
  /** Optional top offset (kept for compatibility with the original API) */
  top?: string;
}

const valueToTransform: Record<DiceValue, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateX(0deg) rotateY(-90deg)",
  3: "rotateX(0deg) rotateY(90deg)",
  4: "rotateX(-90deg) rotateY(0deg)",
  5: "rotateX(90deg) rotateY(0deg)",
  6: "rotateX(0deg) rotateY(180deg)",
};

const clampToDiceValue = (raw: number): DiceValue => {
  if (!Number.isFinite(raw)) return 1;
  const clamped = Math.min(6, Math.max(1, Math.round(raw)));
  return clamped as DiceValue;
};

const Dice = ({ value, diceId = "one", left, top }: DiceProps) => {
  const safeValue = clampToDiceValue(value);
  const finalTransform = valueToTransform[safeValue];

  return (
    <Die
      id={`dice-${diceId}`}
      aria-label={`Die showing ${safeValue}`}
      role="img"
      $leftPos={left}
      $topPos={top}
      $finalTransform={finalTransform}
    >
      <DieSide id={`dice-${diceId}-side-one`}>
        <Dot row="two" column="two" />
      </DieSide>
      <DieSide id={`dice-${diceId}-side-two`}>
        <Dot row="one" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceId}-side-three`}>
        <Dot row="one" column="one" />
        <Dot row="two" column="two" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceId}-side-four`}>
        <Dot row="one" column="one" />
        <Dot row="one" column="three" />
        <Dot row="three" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceId}-side-five`}>
        <Dot row="one" column="one" />
        <Dot row="one" column="three" />
        <Dot row="two" column="two" />
        <Dot row="three" column="one" />
        <Dot row="three" column="three" />
      </DieSide>
      <DieSide id={`dice-${diceId}-side-six`}>
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


