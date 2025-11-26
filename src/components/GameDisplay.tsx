import { GameResult, GameLogEntry } from "../utils/crapsGame";
import Dice from "./Dice";
import {
  DisplayContainer,
  BankrollStatus,
  BankrollLabel,
  BankrollValue,
  GameLog,
  LogEntry,
  LogMessage,
  DiceDisplay,
  DiceTotal,
  ResultsSummary,
  ResultsTitle,
  ResultsItem,
  Separator,
  EmptyState,
} from "./GameDisplay.styled";

/**
 * GameDisplay Component Props
 */
interface GameDisplayProps {
  /** The game result to display, or null if no game has been played yet */
  gameResult: GameResult | null;
  /** A run identifier so animations re-trigger when a new game is started */
  runId: number;
}

/**
 * GameDisplay Component
 *
 * Displays the current bankroll status, game log with all rolls and events,
 * and final results summary. Shows an empty state when no game has been played.
 * Implements WCAG accessibility with proper ARIA labels and live regions.
 */
const GameDisplay = ({ gameResult, runId }: GameDisplayProps) => {
  if (!gameResult) {
    return (
      <DisplayContainer aria-label="Game results">
        <EmptyState>
          Set your bankroll, bet, and number of plays, then click "Start Game"
          to begin!
        </EmptyState>
      </DisplayContainer>
    );
  }

  const renderLogEntry = (entry: GameLogEntry, index: number) => {
    const isDiceRoll = entry.type === "roll" && entry.roll;

    return (
      <LogEntry key={`${runId}-${index}`} $type={entry.type}>
        {isDiceRoll && entry.roll && (
          <DiceDisplay>
            <Dice
              diceId={`log-${runId}-${index}-one`}
              value={entry.roll.die1}
            />
            <Dice
              diceId={`log-${runId}-${index}-two`}
              value={entry.roll.die2}
            />
            <DiceTotal>
              🎲 {entry.roll.die1} + {entry.roll.die2}
            </DiceTotal>
          </DiceDisplay>
        )}
        <LogMessage $type={entry.type}>{entry.message}</LogMessage>
      </LogEntry>
    );
  };

  return (
    <DisplayContainer aria-label="Game results">
      <BankrollStatus>
        <BankrollLabel>Current Bankroll:</BankrollLabel>
        <BankrollValue>${gameResult.finalBankroll}</BankrollValue>
      </BankrollStatus>

      <GameLog role="log" aria-live="polite" aria-label="Game log">
        {gameResult.log.map((entry, index) => renderLogEntry(entry, index))}
      </GameLog>

      <Separator />

      <ResultsSummary>
        <ResultsTitle>Final Results</ResultsTitle>
        <ResultsItem>
          <strong>Initial Bankroll:</strong> ${gameResult.initialBankroll}
        </ResultsItem>
        <ResultsItem>
          <strong>Final Bankroll:</strong> ${gameResult.finalBankroll}
        </ResultsItem>
        <ResultsItem>
          <strong>Games Played:</strong> {gameResult.gamesPlayed}
        </ResultsItem>
        {gameResult.totalWon > 0 && (
          <ResultsItem $type="win">
            <strong>Total Won:</strong> +${gameResult.totalWon}
          </ResultsItem>
        )}
        {gameResult.totalLost > 0 && (
          <ResultsItem $type="lose">
            <strong>Total Lost:</strong> -${gameResult.totalLost}
          </ResultsItem>
        )}
        {gameResult.totalWon === 0 && gameResult.totalLost === 0 && (
          <ResultsItem>
            <strong>Result:</strong> Broke Even
          </ResultsItem>
        )}
      </ResultsSummary>
    </DisplayContainer>
  );
};

export default GameDisplay;
