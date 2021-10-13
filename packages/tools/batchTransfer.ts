require("dotenv").config();

import { ethers } from "ethers";
const fs = require("fs");
const csvSync = require("csv-parse/lib/sync");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const abi = [
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
];

// const ownerAddress = "0x7508e11f9dea26bf81b033b44eae3f7a750f4d1e";
const ownerAddress = "0x6bBAbd004bd05e58894A7277c3d693c7259004a6";

const main = async () => {
  const file = "./input.csv";
  let data = fs.readFileSync(file);
  let csvRows = csvSync(data);

  for (const csvRow of csvRows) {
    const contractAddress = csvRow[0];
    const tokenId = csvRow[1];
    const receiverAddress = csvRow[2];
    const memo = csvRow[3] || "";

    if (!contractAddress || !tokenId || !receiverAddress) {
      continue;
    }
    console.log({ contractAddress, tokenId, receiverAddress, memo });

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const tx = await contract.safeTransferFrom(ownerAddress, receiverAddress, tokenId);
    console.log({ txHash: tx.hash });
    const receipt = await tx.wait();
    console.log({ receipt });
  }
};

main().then((res) => console);
