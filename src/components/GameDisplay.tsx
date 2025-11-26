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
  DiceContainer,
  ResultsSummary,
  ResultsTitle,
  ResultsItem,
  Separator,
  EmptyState,
} from "./GameDisplay.styled";

interface GameDisplayProps {
  gameResult: GameResult | null;
}

const GameDisplay = ({ gameResult }: GameDisplayProps) => {
  if (!gameResult) {
    return (
      <DisplayContainer>
        <EmptyState>
          Set your bankroll, bet, and number of plays, then click "Start Game" to
          begin!
        </EmptyState>
      </DisplayContainer>
    );
  }

  const renderLogEntry = (entry: GameLogEntry, index: number) => {
    const isDiceRoll = entry.type === "roll" && entry.roll;

    return (
      <LogEntry key={index} $type={entry.type}>
        {isDiceRoll && entry.roll && (
          <DiceContainer>
            <Dice 
              value={entry.roll.die1} 
              diceID={`log-${index}-1`} 
              left="0px" 
              top="0px" 
            />
            <Dice 
              value={entry.roll.die2} 
              diceID={`log-${index}-2`} 
              left="0px" 
              top="0px" 
            />
          </DiceContainer>
        )}
        <LogMessage $type={entry.type}>{entry.message}</LogMessage>
      </LogEntry>
    );
  };

  return (
    <DisplayContainer>
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

