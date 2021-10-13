import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../lib/web3";
import { analytics } from "../firebase_config";
import { logEvent } from "firebase/analytics";

export const useWallet = () => {
  const context = useWeb3React();

  const { activate, account, library } = context;

  const connectWallet = () => {
    logEvent(analytics, 'connectWallet_click');
    activate(injectedConnector);
  };

  return [connectWallet, account, library];
};
