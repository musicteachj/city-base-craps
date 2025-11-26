/**
 * Core Craps Game Logic
 *
 * This module implements the simplified craps game rules:
 * - Round 1: Roll 2d6. Win on 7/11, lose on 2/3/12, otherwise set point
 * - Round 2: Roll until matching point (win) or rolling 7 (lose)
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Represents the outcome of a single dice roll
 */
export interface DiceRoll {
  die1: number;
  die2: number;
  total: number;
}

/**
 * Represents the outcome of a single game round
 */
export interface GameRound {
  rolls: DiceRoll[];
  point?: number;
  won: boolean;
  winnings: number;
}

/**
 * Represents a log entry for game events
 */
export interface GameLogEntry {
  type: "roll" | "point" | "win" | "lose" | "game-start" | "game-end";
  message: string;
  roll?: DiceRoll;
  point?: number;
  bankroll?: number;
}

/**
 * Represents the complete game state and results
 */
export interface GameResult {
  initialBankroll: number;
  finalBankroll: number;
  totalWon: number;
  totalLost: number;
  gamesPlayed: number;
  rounds: GameRound[];
  log: GameLogEntry[];
}

/**
 * Parameters for starting a game
 */
export interface GameParams {
  bankroll: number;
  bet: number;
  numberOfPlays: number;
}

// ============================================================================
// Core Game Functions
// ============================================================================

/**
 * Rolls two six-sided dice and returns the result
 */
export function rollDice(): DiceRoll {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  return {
    die1,
    die2,
    total: die1 + die2,
  };
}

/**
 * Plays a single round of craps
 * @param bet - The amount wagered on this round
 * @returns GameRound object containing the round results
 */
export function playRound(bet: number): GameRound {
  const rolls: DiceRoll[] = [];
  let point: number | undefined;
  let won = false;
  let winnings = 0;

  // First roll (Come Out Roll)
  const firstRoll = rollDice();
  rolls.push(firstRoll);

  // Check for immediate win (7 or 11)
  if (firstRoll.total === 7 || firstRoll.total === 11) {
    won = true;
    winnings = bet * 2; // Double the bet
    return { rolls, won, winnings };
  }

  // Check for immediate loss (2, 3, or 12)
  if (
    firstRoll.total === 2 ||
    firstRoll.total === 3 ||
    firstRoll.total === 12
  ) {
    won = false;
    winnings = 0;
    return { rolls, won, winnings };
  }

  // Set the point (4, 5, 6, 8, 9, 10)
  point = firstRoll.total;

  // Second round: Roll until matching point or rolling 7
  while (true) {
    const roll = rollDice();
    rolls.push(roll);

    if (roll.total === point) {
      // Matched the point - WIN
      won = true;
      winnings = bet * 2;
      break;
    } else if (roll.total === 7) {
      // Rolled a 7 - LOSE
      won = false;
      winnings = 0;
      break;
    }
    // Otherwise, keep rolling
  }

  return { rolls, point, won, winnings };
}

/**
 * Plays a complete game with bankroll management
 * @param params - Game parameters including bankroll, bet, and number of plays
 * @returns GameResult object containing complete game state and results
 */
export function playGame(params: GameParams): GameResult {
  const { bankroll: initialBankroll, bet, numberOfPlays } = params;

  let currentBankroll = initialBankroll;
  const rounds: GameRound[] = [];
  const log: GameLogEntry[] = [];
  let gamesPlayed = 0;

  // Play up to the specified number of games or until bankroll is insufficient
  for (let i = 0; i < numberOfPlays; i++) {
    // Check if player has enough money to continue
    if (currentBankroll < bet) {
      log.push({
        type: "game-end",
        message: `Game ended: Insufficient bankroll (${currentBankroll}) for bet (${bet})`,
        bankroll: currentBankroll,
      });
      break;
    }

    // Deduct bet from bankroll
    currentBankroll -= bet;
    gamesPlayed++;

    log.push({
      type: "game-start",
      message: `Game ${gamesPlayed} started. Bet: ${bet}, Bankroll after bet: ${currentBankroll}`,
      bankroll: currentBankroll,
    });

    // Play the round
    const round = playRound(bet);
    rounds.push(round);

    // Log all rolls
    round.rolls.forEach((roll, index) => {
      if (index === 0) {
        // First roll (Come Out Roll)
        log.push({
          type: "roll",
          message: `Come out roll: ${roll.die1} + ${roll.die2} = ${roll.total}`,
          roll,
        });

        // Check for immediate win/loss or point
        if (roll.total === 7 || roll.total === 11) {
          log.push({
            type: "win",
            message: `Natural ${roll.total}! You win!`,
          });
        } else if (roll.total === 2 || roll.total === 3 || roll.total === 12) {
          log.push({
            type: "lose",
            message: `Craps! You lose.`,
          });
        } else if (round.point !== undefined) {
          log.push({
            type: "point",
            message: `Point is set to ${round.point}`,
            point: round.point,
          });
        }
      } else {
        // Subsequent rolls
        log.push({
          type: "roll",
          message: `Roll: ${roll.die1} + ${roll.die2} = ${roll.total}`,
          roll,
        });

        if (roll.total === round.point) {
          log.push({
            type: "win",
            message: `Matched the point ${round.point}! You win!`,
          });
        } else if (roll.total === 7) {
          log.push({
            type: "lose",
            message: `Rolled 7. You lose.`,
          });
        }
      }
    });

    // Add winnings to bankroll
    currentBankroll += round.winnings;

    log.push({
      type: round.won ? "win" : "lose",
      message: `Game ${gamesPlayed} ${round.won ? "won" : "lost"}. Winnings: ${
        round.winnings
      }. Bankroll: ${currentBankroll}`,
      bankroll: currentBankroll,
    });
  }

  // Calculate final statistics
  const totalWon =
    currentBankroll > initialBankroll ? currentBankroll - initialBankroll : 0;
  const totalLost =
    currentBankroll < initialBankroll ? initialBankroll - currentBankroll : 0;

  log.push({
    type: "game-end",
    message: `Final results: Played ${gamesPlayed} games. Started with ${initialBankroll}, ended with ${currentBankroll}. ${
      totalWon > 0
        ? `Won ${totalWon}`
        : totalLost > 0
        ? `Lost ${totalLost}`
        : "Broke even"
    }`,
    bankroll: currentBankroll,
  });

  return {
    initialBankroll,
    finalBankroll: currentBankroll,
    totalWon,
    totalLost,
    gamesPlayed,
    rounds,
    log,
  };
}

/**
 * Validates game parameters
 * @param params - The game parameters to validate
 * @returns Object with isValid flag and error messages
 */
export function validateGameParams(params: GameParams): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validate bankroll (5-1000, inclusive)
  if (params.bankroll < 5 || params.bankroll > 1000) {
    errors.bankroll = "Bankroll must be between 5 and 1000";
  }

  // Validate bet (5 to current bankroll, inclusive)
  if (params.bet < 5) {
    errors.bet = "Bet must be at least 5";
  } else if (params.bet > params.bankroll) {
    errors.bet = "Bet cannot exceed bankroll";
  }

  // Validate number of plays (1-100, inclusive)
  if (params.numberOfPlays < 1 || params.numberOfPlays > 100) {
    errors.numberOfPlays = "Number of plays must be between 1 and 100";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
