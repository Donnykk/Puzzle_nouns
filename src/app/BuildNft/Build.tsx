"use client";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import contractABI from "../NounsPuzzle.json";

const CONTRACT_ADDRESS = "0x1654Cf320fBaB4b0c8C56d8122663b3cf4acA67c";

const NFTBuild: React.FC = () => {
  const [promptHead, setPromptHead] = useState("");
  const [promptBody, setPromptBody] = useState("");
  const [promptAccessory, setPromptAccessory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const initializePuzzleNFT = async (traitNumber: number, trait: number) => {
    if (!isConnected || !walletClient) {
      console.error("Wallet is not connected.");
      return;
    }

    try {
      const hash = await walletClient.sendTransaction({
        account: address,
        to: CONTRACT_ADDRESS,
        data: new ethers.utils.Interface(contractABI).encodeFunctionData(
          "initializePuzzleNFT",
          [traitNumber, trait]
        ) as `0x${string}`,
      });
      console.log(`Transaction hash for trait ${trait}: ${hash}`);
    } catch (error) {
      console.error("Error initializing puzzle NFT:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("button submit");

    const response = await fetch("/api/build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promptHead, promptBody, promptAccessory }),
    });

    if (!response.ok) {
      console.error("Failed to fetch image URL");
      return;
    }

    const data = await response.json();
    const head_num = data.head;
    const body_num = data.body;
    const accessory_num = data.accessory;
    console.log({ head_num, body_num, accessory_num });
    setImageUrl(data.imageUrl);
    console.log(data.imageUrl);

    // Initialize NFTs for each trait
    await initializePuzzleNFT(head_num, 0); // 0 for Head
    await initializePuzzleNFT(body_num, 1); // 1 for Body
    await initializePuzzleNFT(accessory_num, 2); // 2 for Accessory
  };

  return (
    <section className="flex flex-col items-center">
      <section className="flex flex-col items-center">
        {imageUrl && <img src={imageUrl} alt="Generated NFT" />}
      </section>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative flex items-center mt-5">
        <i className="fa-solid fa-search absolute left-3 text-gray-500" />
        <input
          aria-label="prompt"
          type="text"
          className="pl-10 p-2 border-white rounded-md w-[600px]"
          placeholder="Enter a simple key word to generate Head!"
          value={promptHead}
          onChange={(e) => setPromptHead(e.target.value)}
        />
      </form>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative flex items-center mt-5">
        <i className="fa-solid fa-search absolute left-3 text-gray-500" />
        <input
          aria-label="prompt"
          type="text"
          className="pl-10 p-2 border-white rounded-md w-[600px]"
          placeholder="Enter a simple key word to generate Body!"
          value={promptBody}
          onChange={(e) => setPromptBody(e.target.value)}
        />
      </form>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative flex items-center mt-5">
        <i className="fa-solid fa-search absolute left-3 text-gray-500" />
        <input
          aria-label="prompt"
          type="text"
          className="pl-10 p-2 border-white rounded-md w-[600px]"
          placeholder="Enter a simple key word to generate Accessory!"
          value={promptAccessory}
          onChange={(e) => setPromptAccessory(e.target.value)}
        />
      </form>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="relative flex items-center mt-5">
        <button
          type="submit"
          className="ml-4 mt-10 p-2 bg-blue-500 text-white rounded-md"
          disabled={!isConnected}>
          Generate and Initialize NFTs
        </button>
      </form>
    </section>
  );
};

export default NFTBuild;