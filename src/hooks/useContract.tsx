import {
  Account,
  AccountAuthenticator,
  Aptos,
  AptosConfig,
  Deserializer,
  Ed25519PrivateKey,
  Network,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { useState } from "react";
import { MODULE_ADDRESS } from "../utils/Var";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { fromB64, toB64 } from "../utils/HelperFunctions";
import axios from "axios";
import { useAptosWallet } from "@razorlabs/wallet-kit";

interface useContractProps {
  functionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functionArgs: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (result: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void;
  onFinally?: () => void;
}

const ADMIN_PRIVATE_KEY = import.meta.env.VITE_SECRET_ADMIN_KEY;

const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  // const flow = useAptimusFlow();
  const { disconnect, account, signTransaction, signAndSubmitTransaction } =
    useAptosWallet();
  const callContract = async ({
    functionName,
    functionArgs,
    onSuccess,
    onError,
    onFinally,
  }: useContractProps) => {
    const aptosConfig = new AptosConfig({
      network: Network.TESTNET,
      fullnode: "https://testnet.suzuka.movementnetwork.xyz/v1",
      faucet: "https://faucet.testnet.suzuka.movementlabs.xyz/",
    });
    const aptos = new Aptos(aptosConfig);

    if (!account) return;

    try {
      setLoading(true);
      setError(null);

      // create txn
      // const txn = await aptos.transaction.build.simple({
      //   sender: account.address,
      //   data: {
      //     function: `${MODULE_ADDRESS}::gamev1::${functionName}`,
      //     functionArguments: functionArgs,
      //   },
      //   withFeePayer: true,
      // });

      // const txbBase64 = toB64(txn.bcsToBytes());

      // const { sponsorAuthBytesBase64, sponsorSignedTransactionBytesBase64 } = (
      //   await axios.post(
      //     "https://aptimus-gas-pool.weminal.com/v1/transaction-blocks/sponsor",
      //     {
      //       network: "testnet",
      //       transactionBytesBase64: txbBase64,
      //       sender: account.address,
      //     },
      //   )
      // ).data.data;

      // const deserializer = new Deserializer(fromB64(sponsorAuthBytesBase64));
      // const feePayerAuthenticator =
      //   AccountAuthenticator.deserialize(deserializer);

      // // deserialize raw transaction
      // const deserializerTransaction = new Deserializer(
      //   fromB64(sponsorSignedTransactionBytesBase64),
      // );

      // const sponsorSignedTransaction = SimpleTransaction.deserialize(
      //   deserializerTransaction,
      // );

      // const senderAuth = await signTransaction(sponsorSignedTransaction);

      const executedTransaction = await signAndSubmitTransaction({
        payload: {
          function: `${MODULE_ADDRESS}::gamev1::${functionName}`,
          functionArguments: functionArgs,
        },
      });

      // const response = await aptos.transaction.submit.simple({
      //   transaction: sponsorSignedTransaction,
      //   senderAuthenticator: senderAuth,
      //   feePayerAuthenticator,
      // });

      // const executedTransaction = await aptos.waitForTransaction({
      //   transactionHash: response.hash,
      // });

      if (onSuccess) {
        onSuccess(executedTransaction);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        disconnect;
        window.location.reload();
      }
      setError(error.toString());
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  const callAdminContract = async ({
    functionName,
    functionArgs,
    onSuccess,
    onError,
    onFinally,
  }: useContractProps) => {
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);

    const privateKey = new Ed25519PrivateKey(ADMIN_PRIVATE_KEY);

    const adminAccount = await Account.fromPrivateKey({ privateKey });

    if (!adminAccount) return;

    try {
      setLoading(true);
      setError(null);

      //create txn
      const txn = await aptos.transaction.build.simple({
        sender: adminAccount.accountAddress.toString(),
        data: {
          function: `${MODULE_ADDRESS}::gamev1::${functionName}`,
          functionArguments: functionArgs,
        },
        withFeePayer: true,
      });

      const pendingTransaction = await aptos.signAndSubmitTransaction({
        signer: adminAccount,
        transaction: txn,
      });

      const executedTransaction = await aptos.waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });

      console.log("Executed Transaction:", executedTransaction);

      if (onSuccess) {
        onSuccess(executedTransaction);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        disconnect;
        window.location.reload();
      }
      setError(error.toString());
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
      if (onFinally) {
        onFinally();
      }
    }
  };

  return { callContract, callAdminContract, loading, error };
};

export default useContract;
