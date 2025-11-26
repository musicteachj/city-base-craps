import { useState } from "react";
import { AppContainer } from "./App.styled";
import GameControls from "./components/GameControls";
import GameDisplay from "./components/GameDisplay";
import { playGame, GameParams, GameResult } from "./utils/crapsGame";

function App() {
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = (params: GameParams) => {
    setIsPlaying(true);

    // Run the game
    const result = playGame(params);

    setGameResult(result);
    setIsPlaying(false);
  };

  return (
    <AppContainer>
      <GameControls onStartGame={handleStartGame} disabled={isPlaying} />
      <GameDisplay gameResult={gameResult} />
    </AppContainer>
  );
}

export default App;
