import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { ethers } from "ethers";

import { useWallet } from "../../hooks/useWallet";
import { useNFT } from "../../hooks/useContract";
import { Header } from "../organisms/Header";
import { P5Display } from "../organisms/P5Display";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { getNFTContract } from "../../lib/web3";
import { analytics } from "../../firebase_config";
import { logEvent } from "firebase/analytics";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const HomeTemplate: React.FC = () => {
  const [connectWallet, account] = useWallet();
  const [totalNumber, setTotalNumber] = React.useState("");
  const [max, setMax] = React.useState("9999");
  const [isLoading, setLoading] = React.useState(false);
  const [txHash, setTxHash] = React.useState(null);
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    try {
      logEvent(analytics, "mint_click");
      setLoading(true);
      const value = ethers.utils.parseEther("0.0").toString();
      const tx = await nftContractWithSigner.buy(1, { value: value });
      setTxHash(tx.hash);
      logEvent(analytics, "mint_executed");
      alert("After some time, please check the asset in OpenSea mypage.");
      await tx.wait();
      setLoading(false);
    } catch(e) {
      if (String(e.message).includes("denied")) {
        logEvent(analytics, "mint_cancel");
      } else {
        logEvent(analytics, "mint_error");
      }
      setLoading(false);
    }
  };

  // const random = Math.floor(Math.random() * 2222).toString();
  const random = '1';

  const explorerUrlPrefix = process.env.NODE_ENV === "development"
    ? "https://mumbai.polygonscan.com/tx/"
    : "https://polygonscan.com/tx/";

  const openseaMypageUrl = process.env.NODE_ENV === "development"
    ? "https://testnets.opensea.io/account"
    : "https://opensea.io/account";

  React.useEffect(() => {
    const data = process.env.NODE_ENV === "development" ? [
      {
        chainId: "0x13881",
        chainName: "Matic Mumbai-Testnet",
        nativeCurrency: {
          name: "Matic",
          symbol: "Matic",
          decimals: 18,
        },
        rpcUrls: [
          "https://rpc-mumbai.matic.today",
          "https://matic-mumbai.chainstacklabs.com",
          "https://rpc-mumbai.maticvigil.com",
          "https://matic-testnet-archive-rpc.bwarelabs.com",
        ],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ] : [
      {
        chainId: "0x89",
        chainName: "Matic Network",
        nativeCurrency: {
          name: "Matic",
          symbol: "Matic",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.matic.network/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ];
    if(window.ethereum){
      window.ethereum.request({ method: "wallet_addEthereumChain", params: data });
    }
    const nftContract = getNFTContract();
    nftContract.totalSupply().then((supply: number) => {
      setTotalNumber(supply.toString());
    });
    nftContract.MAX_ELEMENTS().then((max: number) => {
      setMax(max.toString());
    });
  }, []);

  return (
    <>
      <Header></Header>
      <div className="main mb-8">
        <div className="py-4 mt-8" style={{fontSize: '1.8em'}}>
          <Heading align="center" as="h1" size="3xl">
            ArtiStake Community NFT
          </Heading>
        </div>
        <div className="pb-4">
          <Text align="center">
            This is ArtiStake Community NFT! <br />
            This is an interactive generative art NFT. Please enjoy it with your mouse movenment!
          </Text>
        </div>
        <div className="grid lg:grid-cols-2 lg:p-10">
          <div className="p-2">
            <P5Display index={random} />
          </div>
          <div className="m-auto">
            <div className="pb-5">
              <Heading align="center" as="h2" size="xl">
                Claim here
              </Heading>
            </div>
            <div className="pb-5">
              <Text align="center" size="2xl">
                {totalNumber} / {max} minted
              </Text>
            </div>
            <div className="pb-5">
              <Text align="center" size="2xl">
                Price : Free
              </Text>
            </div>
            {Number(totalNumber) >= Number(max) ? (
              <>
                <div className="pb-5">
                  <Text align="center" size="2xl">
                    Sold Out
                  </Text>
                </div>
                <a href="https://opensea.io" target="_blank" rel="noreferrer">
                  <Button color="pink" rounded={true}>
                    View on OpenSea
                  </Button>
                </a>
              </>
            ) : (
              <>
                {!account ? (
                  <Button onClick={connectWallet} color="pink" rounded={true} className="mb-8">
                    connectWallet
                  </Button>
                ) : (
                  <Button onClick={mint} color="pink" rounded={true} className="mb-8" disabled={isLoading}>
                    {isLoading ? 'sending..' : 'mint'}
                  </Button>
                )}
                {txHash ? (
                  <>
                    <div className="pb-5">
                      <a href={explorerUrlPrefix + txHash} target="_blank" rel="noreferrer">
                        <Text align="center" size="2xl" className="underline">
                          View Tx on Polygonscan
                        </Text>
                      </a>
                    </div>
                    <div className="pb-5">
                      <a href={openseaMypageUrl} target="_blank" rel="noreferrer">
                        <Text align="center" size="2xl" className="underline">
                          Open OpenSea MyPage
                        </Text>
                      </a>
                    </div>
                  </>
              ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      <footer className={`w-full bg-marimo-1 px-8`}>
        <div style={{ textAlign: "center", padding: 50 }} className="flex items-center justify-center text-white">
          <a href="https://artistake.tokyo/" target="_blank" rel="noreferrer"className="pr-2 pl-2">
            <img className="h-11 mr-3" src="/assets/logo.png" alt="ArtiStake" />
          </a>
          <a href="https://twitter.com/ArtiStake_" target="_blank" rel="noreferrer"className="pr-2 pl-2">
            <FontAwesomeIcon color="white" style={{ padding: 10, fontSize: 50 }} icon={faTwitter} />
          </a>
          <a href="https://discord.gg/pfHvpb8QFB" target="_blank" rel="noreferrer" className="pr-2 pl-2">
            <FontAwesomeIcon color="white p-10" style={{ padding: 10, fontSize: 50 }} icon={faDiscord} />
          </a>
        </div>
      </footer>
    </>
  );
};
