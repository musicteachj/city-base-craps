import { useState } from "react";
import { AppContainer } from "./App.styled";
import GlobalStyles from "./GlobalStyles";
import GameControls from "./components/GameControls";
import GameDisplay from "./components/GameDisplay";
import { playGame, GameParams, GameResult } from "./utils/crapsGame";

/**
 * Main App Component
 *
 * Coordinates the game controls and display components,
 * manages game state, and handles game execution flow.
 */
function App() {
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles starting a new game with the provided parameters
   * Includes error handling for unexpected game errors
   */
  const handleStartGame = (params: GameParams) => {
    setIsPlaying(true);
    setError(null);

    try {
      // Run the game
      const result = playGame(params);
      setGameResult(result);
    } catch (err) {
      // Handle any unexpected errors during game execution
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Game error:", err);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <GameControls
          onStartGame={handleStartGame}
          disabled={isPlaying}
          error={error}
        />
        <GameDisplay gameResult={gameResult} />
      </AppContainer>
    </>
  );
}

export default App;
