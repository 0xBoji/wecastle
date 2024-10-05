import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerInfo } from "../type/type";
import useGetPlayer from "../hooks/useGetPlayer";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useCredit from "../hooks/useCredit";

import { useAptosWallet } from "@razorlabs/wallet-kit";

// Define an interface for the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  player: PlayerInfo;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  fetchPlayerInfo: (address: string) => Promise<boolean>;
  fetchCreditInfor: (address: string) => Promise<void>;
  CreditInfor: number;
  isSuccessFetchPlayer: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { fetchPlayer } = useGetPlayer();
  const { fetchCredit } = useCredit();
  const { account } = useAptosWallet();
  const [isSuccessFetchPlayer, setIsSuccessFetchPlayer] = useState(false);
  const [CreditInfor, setCreditInfor] = useState<number>(0);
  const [player, setPlayer] = useState<PlayerInfo>({
    address_id: "",
    current_round: 0,
    game_finished: true,
    hero_owned: "",
    name: "",
    last_claim_time: "",
    round1_finish_time: "",
    round1_play_time: "",
    round2_finish_time: "",
    round2_play_time: "",
    round3_finish_time: "",
    round3_play_time: "",
  });

  const fetchPlayerInfo = async (address: string) => {
    const player = await fetchPlayer(address);

    if (player) {
      setPlayer(player);
      setIsSuccessFetchPlayer(true);
      return true;
    }

    setIsSuccessFetchPlayer(false);
    return false;
  };

  const fetchCreditInfor = async (address: string) => {
    const credit = await fetchCredit(address);

    if (credit) {
      setCreditInfor(credit);
    }
  };

  useEffect(() => {
    if (!account) return;
    fetchPlayerInfo(account.address);
  }, [account]);

  return (
    <AuthContext.Provider
      value={{
        player,
        setPlayer,
        fetchPlayerInfo,
        fetchCreditInfor,
        CreditInfor,
        isSuccessFetchPlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
