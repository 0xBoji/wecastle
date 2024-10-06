import { useContext, forwardRef, useEffect, useCallback } from "react";
import { Unity } from "react-unity-webgl";
import styled from "styled-components";
import UnityGameContext from "../contexts/UnityGameProvider";
import { Box } from "@mui/material";
import AuthContext from "../contexts/AuthProvider";
import useGame from "../hooks/useGame";

export const useUnityGame = () => useContext(UnityGameContext);

const UnityGame = styled(Unity)`
  width: 100%;
  height: 100%;
`;

const UnityGameComponent = forwardRef((props, ref) => {
  const { unityProvider } = useUnityGame();

  const { endGame } = useGame();
  const auth = useContext(AuthContext);

  // const handlePushRewardGame = useCallback(
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (points: any) => {
  //     const p = JSON.parse(points);
  //     if (!auth) return;

  //     const round =
  //       auth.player.current_round !== 0 ? auth.player.current_round : 1;

  //     console.log("end game");

  //     // endGame(round, p, auth.player.address_id);
  //   },
  //   [auth, endGame],
  // );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handlePushRewardGame = (points: any) => {
  //   console.log(points);
  // };

  const handleComponentEvent = ({ detail }: CustomEvent<{ Score: number }>) => {
    const { Score } = detail;
    console.log(Score);

    if (!auth) return;

    const round =
      auth.player.current_round !== 0 ? auth.player.current_round : 1;

    endGame(round, Score, auth.player.address_id).then((res) => {
      alert("end game");
    });
  };

  useEffect(() => {
    // Add the event listener
    addEventListener(
      "PushRewardForPlayerEvent",
      handleComponentEvent as EventListener,
    );

    // Clean up the event listener on unmount
    return () => {
      removeEventListener(
        "PushRewardForPlayer",
        handleComponentEvent as EventListener,
      );
    };
  }, []);

  return <UnityGame unityProvider={unityProvider} />;
});

export default UnityGameComponent;
