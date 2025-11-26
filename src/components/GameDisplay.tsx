import { GameResult, GameLogEntry } from "../utils/crapsGame";
import {
  DisplayContainer,
  BankrollStatus,
  BankrollLabel,
  BankrollValue,
  GameLog,
  LogEntry,
  LogMessage,
  DiceDisplay,
  DiceFace,
  DicePip,
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

const pipLayout: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

const renderPips = (value: number) =>
  Array.from({ length: 9 }, (_, index) => {
    const position = index + 1;
    const isVisible = pipLayout[value]?.includes(position) ?? false;

    return <DicePip key={position} $visible={isVisible} />;
  });

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
            <DiceFace aria-hidden="true">
              {renderPips(entry.roll.die1)}
            </DiceFace>
            <DiceFace aria-hidden="true">
              {renderPips(entry.roll.die2)}
            </DiceFace>
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
