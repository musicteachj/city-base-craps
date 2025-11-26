import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  rollDice,
  playRound,
  playGame,
  validateGameParams,
  type GameParams,
} from "./crapsGame";

describe("rollDice", () => {
  it("should return a valid dice roll with two dice values and total", () => {
    const roll = rollDice();

    expect(roll).toHaveProperty("die1");
    expect(roll).toHaveProperty("die2");
    expect(roll).toHaveProperty("total");

    expect(roll.die1).toBeGreaterThanOrEqual(1);
    expect(roll.die1).toBeLessThanOrEqual(6);
    expect(roll.die2).toBeGreaterThanOrEqual(1);
    expect(roll.die2).toBeLessThanOrEqual(6);
    expect(roll.total).toBe(roll.die1 + roll.die2);
  });

  it("should return totals between 2 and 12", () => {
    // Run multiple times to test randomness
    for (let i = 0; i < 100; i++) {
      const roll = rollDice();
      expect(roll.total).toBeGreaterThanOrEqual(2);
      expect(roll.total).toBeLessThanOrEqual(12);
    }
  });

  it("should produce different results over multiple rolls", () => {
    const rolls = new Set();
    for (let i = 0; i < 50; i++) {
      const roll = rollDice();
      rolls.add(roll.total);
    }
    // With 50 rolls, we should see at least some variety
    expect(rolls.size).toBeGreaterThan(1);
  });
});

describe("playRound", () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.restoreAllMocks();
  });

  it("should throw error for invalid bet amounts", () => {
    expect(() => playRound(0)).toThrow("Invalid bet amount");
    expect(() => playRound(-5)).toThrow("Invalid bet amount");
    expect(() => playRound(Infinity)).toThrow("Invalid bet amount");
    expect(() => playRound(NaN)).toThrow("Invalid bet amount");
  });

  it("should win immediately on first roll of 7", () => {
    // Mock rollDice to return 7 (3 + 4)
    vi.spyOn(Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.6);

    const result = playRound(10);

    expect(result.won).toBe(true);
    expect(result.winnings).toBe(20); // Double the bet
    expect(result.rolls).toHaveLength(1);
    expect(result.rolls[0].total).toBe(7);
    expect(result.point).toBeUndefined();
  });

  it("should win immediately on first roll of 11", () => {
    // Mock rollDice to return 11 (5 + 6)
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.7) // die1 = 5
      .mockReturnValueOnce(0.9); // die2 = 6

    const result = playRound(10);

    expect(result.won).toBe(true);
    expect(result.winnings).toBe(20);
    expect(result.rolls).toHaveLength(1);
    expect(result.rolls[0].total).toBe(11);
    expect(result.point).toBeUndefined();
  });

  it("should lose immediately on first roll of 2", () => {
    // Mock rollDice to return 2 (1 + 1)
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01);

    const result = playRound(10);

    expect(result.won).toBe(false);
    expect(result.winnings).toBe(0);
    expect(result.rolls).toHaveLength(1);
    expect(result.rolls[0].total).toBe(2);
    expect(result.point).toBeUndefined();
  });

  it("should lose immediately on first roll of 3", () => {
    // Mock rollDice to return 3 (1 + 2)
    vi.spyOn(Math, "random").mockReturnValueOnce(0.01).mockReturnValueOnce(0.2);

    const result = playRound(10);

    expect(result.won).toBe(false);
    expect(result.winnings).toBe(0);
    expect(result.rolls).toHaveLength(1);
    expect(result.rolls[0].total).toBe(3);
  });

  it("should lose immediately on first roll of 12", () => {
    // Mock rollDice to return 12 (6 + 6)
    vi.spyOn(Math, "random").mockReturnValueOnce(0.9).mockReturnValueOnce(0.9);

    const result = playRound(10);

    expect(result.won).toBe(false);
    expect(result.winnings).toBe(0);
    expect(result.rolls).toHaveLength(1);
    expect(result.rolls[0].total).toBe(12);
  });

  it("should set point and continue rolling when first roll is 4, 5, 6, 8, 9, or 10", () => {
    // Mock rollDice to return 8 (4 + 4), then 5 (2+3), then 8 (4+4) again to win
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.6) // First roll: 8 (4+4, sets point)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4) // Second roll: 5 (2+3, continue)
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.6); // Third roll: 8 (4+4, match point, win)

    const result = playRound(10);

    expect(result.point).toBe(8);
    expect(result.rolls).toHaveLength(3);
    expect(result.won).toBe(true);
    expect(result.winnings).toBe(20);
  });

  it("should win when matching the point in second round", () => {
    // First roll sets point to 6 (3+3), then roll 6 (2+4) again
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.4) // First roll: 6 (3+3, sets point)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.6); // Second roll: 6 (2+4, match point, win)

    const result = playRound(10);

    expect(result.point).toBe(6);
    expect(result.won).toBe(true);
    expect(result.winnings).toBe(20);
    expect(result.rolls).toHaveLength(2);
  });

  it("should lose when rolling 7 in second round", () => {
    // First roll sets point to 9 (4+5), then roll 7 (3+4)
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.7) // First roll: 9 (4+5, sets point)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6); // Second roll: 7 (3+4, lose)

    const result = playRound(10);

    expect(result.point).toBe(9);
    expect(result.won).toBe(false);
    expect(result.winnings).toBe(0);
    expect(result.rolls).toHaveLength(2);
  });

  it("should continue rolling until matching point or rolling 7", () => {
    // First roll sets point to 5 (2+3), then multiple rolls before winning
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4) // First roll: 5 (2+3, sets point)
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01) // Second roll: 2 (1+1, continue)
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.7) // Third roll: 9 (4+5, continue)
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.9) // Fourth roll: 11 (5+6, continue)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4); // Fifth roll: 5 (2+3, match point, win)

    const result = playRound(10);

    expect(result.point).toBe(5);
    expect(result.rolls).toHaveLength(5);
    expect(result.won).toBe(true);
    expect(result.winnings).toBe(20);
  });
});

describe("validateGameParams", () => {
  it("should validate correct parameters", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("should reject bankroll below minimum (5)", () => {
    const params: GameParams = {
      bankroll: 4,
      bet: 10,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bankroll).toBe("Bankroll must be between 5 and 1000");
  });

  it("should reject bankroll above maximum (1000)", () => {
    const params: GameParams = {
      bankroll: 1001,
      bet: 10,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bankroll).toBe("Bankroll must be between 5 and 1000");
  });

  it("should accept bankroll at boundaries (5 and 1000)", () => {
    const params1: GameParams = {
      bankroll: 5,
      bet: 5,
      numberOfPlays: 1,
    };

    const params2: GameParams = {
      bankroll: 1000,
      bet: 100,
      numberOfPlays: 1,
    };

    expect(validateGameParams(params1).isValid).toBe(true);
    expect(validateGameParams(params2).isValid).toBe(true);
  });

  it("should reject non-finite bankroll", () => {
    const params: GameParams = {
      bankroll: NaN,
      bet: 10,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bankroll).toBe("Bankroll must be a valid number");
  });

  it("should reject bet below minimum (5)", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 4,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bet).toBe("Bet must be at least 5");
  });

  it("should reject bet exceeding bankroll", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 101,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bet).toBe("Bet cannot exceed bankroll");
  });

  it("should accept bet equal to bankroll", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 100,
      numberOfPlays: 1,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(true);
  });

  it("should reject non-finite bet", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: Infinity,
      numberOfPlays: 5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.bet).toBe("Bet must be a valid number");
  });

  it("should reject numberOfPlays below minimum (1)", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 0,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.numberOfPlays).toBe(
      "Number of plays must be between 1 and 100"
    );
  });

  it("should reject numberOfPlays above maximum (100)", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 101,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.numberOfPlays).toBe(
      "Number of plays must be between 1 and 100"
    );
  });

  it("should accept numberOfPlays at boundaries (1 and 100)", () => {
    const params1: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 1,
    };

    const params2: GameParams = {
      bankroll: 1000,
      bet: 10,
      numberOfPlays: 100,
    };

    expect(validateGameParams(params1).isValid).toBe(true);
    expect(validateGameParams(params2).isValid).toBe(true);
  });

  it("should reject non-integer numberOfPlays", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 5.5,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.numberOfPlays).toBe(
      "Number of plays must be a valid integer"
    );
  });

  it("should reject non-finite numberOfPlays", () => {
    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: NaN,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(result.errors.numberOfPlays).toBe(
      "Number of plays must be a valid integer"
    );
  });

  it("should return multiple errors when multiple parameters are invalid", () => {
    const params: GameParams = {
      bankroll: 2000,
      bet: 3,
      numberOfPlays: 150,
    };

    const result = validateGameParams(params);

    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(3);
    expect(result.errors.bankroll).toBeDefined();
    expect(result.errors.bet).toBeDefined();
    expect(result.errors.numberOfPlays).toBeDefined();
  });
});

describe("playGame", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw error for invalid parameters", () => {
    const invalidParams: GameParams = {
      bankroll: 3,
      bet: 10,
      numberOfPlays: 5,
    };

    expect(() => playGame(invalidParams)).toThrow("Invalid game parameters");
  });

  it("should play single game successfully", () => {
    // Mock to win immediately with 7 (3+4)
    vi.spyOn(Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.6); // Roll 7

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 1,
    };

    const result = playGame(params);

    expect(result.initialBankroll).toBe(100);
    expect(result.finalBankroll).toBe(110); // 100 - 10 + 20
    expect(result.gamesPlayed).toBe(1);
    expect(result.rounds).toHaveLength(1);
    expect(result.totalWon).toBe(10);
    expect(result.totalLost).toBe(0);
  });

  it("should deduct bet before each game", () => {
    // Mock to lose immediately with 2
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01); // Roll 2

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 1,
    };

    const result = playGame(params);

    expect(result.initialBankroll).toBe(100);
    expect(result.finalBankroll).toBe(90); // 100 - 10 + 0
    expect(result.totalLost).toBe(10);
    expect(result.totalWon).toBe(0);
  });

  it("should play multiple games", () => {
    // Mock: win, lose, win
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6) // Game 1: Roll 7 (3+4, win)
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01) // Game 2: Roll 2 (1+1, lose)
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.9); // Game 3: Roll 11 (5+6, win)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 3,
    };

    const result = playGame(params);

    expect(result.gamesPlayed).toBe(3);
    expect(result.rounds).toHaveLength(3);
    // Bankroll: 100 - 10 + 20 - 10 + 0 - 10 + 20 = 110
    expect(result.finalBankroll).toBe(110);
  });

  it("should stop when bankroll is insufficient for next bet", () => {
    // Mock to lose all games
    vi.spyOn(Math, "random").mockReturnValue(0.01); // Always roll 2 (lose)

    const params: GameParams = {
      bankroll: 15,
      bet: 10,
      numberOfPlays: 10,
    };

    const result = playGame(params);

    // Can only play once: 15 - 10 = 5, which is < 10
    expect(result.gamesPlayed).toBe(1);
    expect(result.finalBankroll).toBe(5);
    expect(
      result.log.some(
        (entry) =>
          entry.type === "game-end" &&
          entry.message.includes("Insufficient bankroll")
      )
    ).toBe(true);
  });

  it("should track game log correctly", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.6); // Roll 7 (3+4)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 1,
    };

    const result = playGame(params);

    expect(result.log.length).toBeGreaterThan(0);
    expect(result.log.some((entry) => entry.type === "game-start")).toBe(true);
    expect(result.log.some((entry) => entry.type === "roll")).toBe(true);
    expect(result.log.some((entry) => entry.type === "win")).toBe(true);
    expect(result.log.some((entry) => entry.type === "game-end")).toBe(true);
  });

  it("should log point setting when applicable", () => {
    // First roll sets point to 6 (3+3), then match it (2+4)
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.4) // Roll 6 (3+3, set point)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.6); // Roll 6 (2+4, match point)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 1,
    };

    const result = playGame(params);

    const pointLog = result.log.find((entry) => entry.type === "point");
    expect(pointLog).toBeDefined();
    expect(pointLog?.point).toBe(6);
  });

  it("should calculate totalWon correctly", () => {
    // Win multiple games - need to mock for each die roll (2 per game)
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6) // Game 1: 7 (3+4)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6) // Game 2: 7 (3+4)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6); // Game 3: 7 (3+4)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 3,
    };

    const result = playGame(params);

    // Each game: -10 bet + 20 winnings = +10 net
    // Total: +30
    expect(result.totalWon).toBe(30);
    expect(result.totalLost).toBe(0);
    expect(result.finalBankroll).toBe(130);
  });

  it("should calculate totalLost correctly", () => {
    // Lose multiple games
    vi.spyOn(Math, "random").mockReturnValue(0.01); // Always roll 2 (lose)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 3,
    };

    const result = playGame(params);

    // Each game: -10 bet + 0 winnings = -10 net
    // Total: -30
    expect(result.totalLost).toBe(30);
    expect(result.totalWon).toBe(0);
    expect(result.finalBankroll).toBe(70);
  });

  it("should handle breaking even", () => {
    // Win once, lose once
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6) // Game 1: Roll 7 (3+4, win)
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01); // Game 2: Roll 2 (1+1, lose)

    const params: GameParams = {
      bankroll: 100,
      bet: 10,
      numberOfPlays: 2,
    };

    const result = playGame(params);

    expect(result.finalBankroll).toBe(100);
    expect(result.totalWon).toBe(0);
    expect(result.totalLost).toBe(0);
  });

  it("should handle edge case of betting entire bankroll", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.6); // Roll 7 (3+4, win)

    const params: GameParams = {
      bankroll: 100,
      bet: 100,
      numberOfPlays: 1,
    };

    const result = playGame(params);

    // Should play once, win, and end with 200
    expect(result.gamesPlayed).toBe(1);
    expect(result.finalBankroll).toBe(200);
  });

  it("should handle losing entire bankroll on first game", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.01); // Roll 2 (lose)

    const params: GameParams = {
      bankroll: 10,
      bet: 10,
      numberOfPlays: 10,
    };

    const result = playGame(params);

    // Should play once and lose everything
    expect(result.gamesPlayed).toBe(1);
    expect(result.finalBankroll).toBe(0);
    expect(result.totalLost).toBe(10);
  });
});
