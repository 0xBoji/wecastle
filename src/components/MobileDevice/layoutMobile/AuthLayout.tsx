// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";

import { useAptosWallet } from "@razorlabs/wallet-kit";


const AuthLayout = () => {
  const { connected } = useAptosWallet();

  useEffect(() => {
    if (connected) {
      redirect("/");
    }
  }, [connected]);
  return (
    <div id="login" className="flex h-[100vh] items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
