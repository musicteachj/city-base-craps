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
  StatsPanel,
  StatsTitle,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatSubtext,
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
 * Derived quick statistics for a completed game run
 */
interface QuickStats {
  wins: number;
  losses: number;
  winRate: number;
  averageRollsPerGame: number;
  longestWinStreak: number;
  longestLossStreak: number;
}

/**
 * Computes quick statistics from a GameResult
 */
const computeQuickStats = (gameResult: GameResult): QuickStats | null => {
  const { rounds, gamesPlayed } = gameResult;

  if (!gamesPlayed || rounds.length === 0) {
    return null;
  }

  let wins = 0;
  let totalRolls = 0;

  let longestWinStreak = 0;
  let longestLossStreak = 0;
  let currentWinStreak = 0;
  let currentLossStreak = 0;

  rounds.forEach((round) => {
    if (round.won) {
      wins += 1;
      currentWinStreak += 1;
      currentLossStreak = 0;
      if (currentWinStreak > longestWinStreak) {
        longestWinStreak = currentWinStreak;
      }
    } else {
      currentLossStreak += 1;
      currentWinStreak = 0;
      if (currentLossStreak > longestLossStreak) {
        longestLossStreak = currentLossStreak;
      }
    }

    totalRolls += round.rolls.length;
  });

  const losses = gamesPlayed - wins;
  const winRate = gamesPlayed > 0 ? (wins / gamesPlayed) * 100 : 0;
  const averageRollsPerGame =
    gamesPlayed > 0 ? totalRolls / gamesPlayed : 0;

  return {
    wins,
    losses,
    winRate,
    averageRollsPerGame,
    longestWinStreak,
    longestLossStreak,
  };
};

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

  const quickStats = computeQuickStats(gameResult);

  // Limit the number of log entries rendered at once to keep scrolling smooth
  const MAX_LOG_ENTRIES = 120;
  const totalLogEntries = gameResult.log.length;
  const logStartIndex =
    totalLogEntries > MAX_LOG_ENTRIES
      ? totalLogEntries - MAX_LOG_ENTRIES
      : 0;
  const visibleLog = gameResult.log.slice(logStartIndex);

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
        {logStartIndex > 0 && (
          <LogEntry $type="game-start">
            <LogMessage $type="game-start">
              Showing last {visibleLog.length} of {totalLogEntries} events for
              this run.
            </LogMessage>
          </LogEntry>
        )}
        {visibleLog.map((entry, index) =>
          renderLogEntry(entry, logStartIndex + index)
        )}
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

        {quickStats && (
          <StatsPanel aria-label="Quick stats for this run">
            <StatsTitle>Quick Stats (This Run)</StatsTitle>
            <StatsGrid>
              <StatCard>
                <StatLabel>Win Rate</StatLabel>
                <StatValue>{quickStats.winRate.toFixed(1)}%</StatValue>
                <StatSubtext>
                  {quickStats.wins} wins / {gameResult.gamesPlayed} games
                </StatSubtext>
              </StatCard>

              <StatCard>
                <StatLabel>Avg Rolls / Game</StatLabel>
                <StatValue>
                  {quickStats.averageRollsPerGame.toFixed(1)}
                </StatValue>
                <StatSubtext>Total rolls: {gameResult.rounds.reduce(
                  (sum, round) => sum + round.rolls.length,
                  0
                )}</StatSubtext>
              </StatCard>

              <StatCard>
                <StatLabel>Win Streak</StatLabel>
                <StatValue>{quickStats.longestWinStreak}</StatValue>
                <StatSubtext>Longest consecutive wins</StatSubtext>
              </StatCard>

              <StatCard>
                <StatLabel>Loss Streak</StatLabel>
                <StatValue>{quickStats.longestLossStreak}</StatValue>
                <StatSubtext>Longest consecutive losses</StatSubtext>
              </StatCard>
            </StatsGrid>
          </StatsPanel>
        )}
      </ResultsSummary>
    </DisplayContainer>
  );
};

export default GameDisplay;
