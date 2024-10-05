import { useContext, forwardRef } from "react";
import { Unity } from "react-unity-webgl";
import styled from "styled-components";
import UnityGameContext from "../contexts/UnityGameProvider";
import { Box } from "@mui/material";

export const useUnityGame = () => useContext(UnityGameContext);

const UnityGame = styled(Unity)`
  width: 100%;
  height: 100%;
`;

const UnityGameComponent = forwardRef((props, ref) => {
  const { unityProvider } = useUnityGame();

  return <UnityGame unityProvider={unityProvider} />;
});

export default UnityGameComponent;
