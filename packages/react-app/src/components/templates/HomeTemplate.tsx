import React from "react";
import { ethers } from "ethers";

import { useWallet } from "../../hooks/useWallet";
import { useNFT } from "../../hooks/useContract";
import { Header } from "../organisms/Header";
import { P5Display } from "../organisms/P5Display";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { getNFTContract } from "../../lib/web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const HomeTemplate: React.FC = () => {
  const [connectWallet, account] = useWallet();
  const [totalNumber, setTotalNumber] = React.useState("");
  const [max, setMax] = React.useState("9999");
  const nftContractWithSigner = useNFT();

  const mint = async () => {
    const value = ethers.utils.parseEther("0.0").toString();
    await nftContractWithSigner.buy(1, { value: value });
  };

  // const random = Math.floor(Math.random() * 2222).toString();
  const random = '1';

  React.useEffect(() => {
    const data = [
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
    // const data = [
    //   {
    //     chainId: "0x13881",
    //     chainName: "Matic Mumbai-Testnet",
    //     nativeCurrency: {
    //       name: "Matic",
    //       symbol: "Matic",
    //       decimals: 18,
    //     },
    //     rpcUrls: [
    //       "https://rpc-mumbai.matic.today",
    //       "https://matic-mumbai.chainstacklabs.com",
    //       "https://rpc-mumbai.maticvigil.com",
    //       "https://matic-testnet-archive-rpc.bwarelabs.com",
    //     ],
    //     blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    //   },
    // ];
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
      <div className="main">
        <div className="py-4 mt-8" style={{fontSize: '1.8em'}}>
          <Heading align="center" as="h1" size="3xl">
            ArtiStake Thanks Fracton Incubation 2021 NFT
          </Heading>
        </div>
        <div className="pb-4">
          <Text align="center">
            This is Fracton Incubation 2021 Memorial NFT to thank everyone who supports ArtiStake! <br/>
            This is an interactive generative art NFT. Please enjoy it with your mouse movenment!</Text>
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
                  <Button onClick={mint} color="pink" rounded={true} className="mb-8">
                    mint
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
