import { useState, useEffect } from "react";
import {
  ControlsContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  StartButton,
  Title,
} from "./GameControls.styled";
import { GameParams, validateGameParams } from "../utils/crapsGame";

interface GameControlsProps {
  onStartGame: (params: GameParams) => void;
  disabled?: boolean;
}

const GameControls = ({ onStartGame, disabled = false }: GameControlsProps) => {
  const [bankroll, setBankroll] = useState<string>("100");
  const [bet, setBet] = useState<string>("5");
  const [numberOfPlays, setNumberOfPlays] = useState<string>("10");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate on every change
  useEffect(() => {
    const params = {
      bankroll: Number(bankroll) || 0,
      bet: Number(bet) || 0,
      numberOfPlays: Number(numberOfPlays) || 0,
    };
    const validation = validateGameParams(params);
    setErrors(validation.errors);
  }, [bankroll, bet, numberOfPlays]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ bankroll: true, bet: true, numberOfPlays: true });

    const params = {
      bankroll: Number(bankroll),
      bet: Number(bet),
      numberOfPlays: Number(numberOfPlays),
    };

    const validation = validateGameParams(params);
    if (validation.isValid) {
      onStartGame(params);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <ControlsContainer>
      <Title>Craps Game</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="bankroll">
            Bankroll ($5 - $1,000)
          </Label>
          <Input
            type="number"
            id="bankroll"
            name="bankroll"
            value={bankroll}
            onChange={(e) => setBankroll(e.target.value)}
            onBlur={() => handleBlur("bankroll")}
            min="5"
            max="1000"
            required
            aria-required="true"
            aria-invalid={touched.bankroll && !!errors.bankroll}
            aria-describedby={
              touched.bankroll && errors.bankroll
                ? "bankroll-error"
                : undefined
            }
            $hasError={touched.bankroll && !!errors.bankroll}
            disabled={disabled}
          />
          {touched.bankroll && errors.bankroll && (
            <ErrorMessage id="bankroll-error" role="alert">
              {errors.bankroll}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bet">
            Bet ($5 - Current Bankroll)
          </Label>
          <Input
            type="number"
            id="bet"
            name="bet"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            onBlur={() => handleBlur("bet")}
            min="5"
            max={bankroll}
            required
            aria-required="true"
            aria-invalid={touched.bet && !!errors.bet}
            aria-describedby={touched.bet && errors.bet ? "bet-error" : undefined}
            $hasError={touched.bet && !!errors.bet}
            disabled={disabled}
          />
          {touched.bet && errors.bet && (
            <ErrorMessage id="bet-error" role="alert">
              {errors.bet}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="numberOfPlays">
            Number of Plays (1 - 100)
          </Label>
          <Input
            type="number"
            id="numberOfPlays"
            name="numberOfPlays"
            value={numberOfPlays}
            onChange={(e) => setNumberOfPlays(e.target.value)}
            onBlur={() => handleBlur("numberOfPlays")}
            min="1"
            max="100"
            required
            aria-required="true"
            aria-invalid={touched.numberOfPlays && !!errors.numberOfPlays}
            aria-describedby={
              touched.numberOfPlays && errors.numberOfPlays
                ? "numberOfPlays-error"
                : undefined
            }
            $hasError={touched.numberOfPlays && !!errors.numberOfPlays}
            disabled={disabled}
          />
          {touched.numberOfPlays && errors.numberOfPlays && (
            <ErrorMessage id="numberOfPlays-error" role="alert">
              {errors.numberOfPlays}
            </ErrorMessage>
          )}
        </FormGroup>

        <StartButton
          type="submit"
          disabled={!isValid || disabled}
          aria-label="Start game"
        >
          {disabled ? "Playing..." : "Start Game"}
        </StartButton>
      </form>
    </ControlsContainer>
  );
};

export default GameControls;

