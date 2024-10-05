import React, { useState, useEffect, useContext } from "react";
import { Modal } from "@mui/material";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";
import useGame from "../../../hooks/useGame";
import AuthContext from "../../../contexts/AuthProvider";

const PlayGame: React.FC = () => {
  const auth = useContext(AuthContext);
  const { isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);
  const { playRound } = useGame();

  useEffect(() => {
    if (!auth) return;

    if (isLoaded) {
      setLoadGame(false);
      playRound(
        auth.player.current_round !== 0 ? auth.player.current_round : 1,
      );
    }
  }, [isLoaded, auth]);

  return (
    <>
      {!loadGame ? (
        <div className="h-full w-full">
          <UnityGameComponent />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default PlayGame;
