import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

import "@razorlabs/wallet-kit/style.css"

import { useAptosWallet, AptosConnectButton } from "@razorlabs/wallet-kit";

export const LoginPage = () => {
  const { connected, account } = useAptosWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate("/");
    }
  }, [connected]);

  const handleLogin = () => {
    const btn: HTMLElement | null = document.querySelector(".wkit-button");
    btn?.click();
  };

  return (
    <>
      <div className="hidden">
        <AptosConnectButton />
      </div>
      <div className="flex w-full flex-col items-center space-y-72">
        <img src="/banner.png" className="w-2/3" />
        <button
          className="mt-10 inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
          onClick={handleLogin}
        >
          <FcGoogle />
          <span className="ml-1">Sign in</span>
        </button>
      </div>
    </>
  );
};
