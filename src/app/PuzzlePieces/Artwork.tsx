"use client";
import React, { useState, useEffect } from "react";
import collageContractABI from "../NounsCollage.json";
import puzzleContractABI from "../NounsPuzzle.json";
import { ethers } from "ethers";

const COLLAGE_CONTRACT_ADDRESS = "0xc0a8B843fb5B06e09D1C00EDf50fc5b2FA2f0387";
const PUZZLE_CONTRACT_ADDRESS = "0x1654Cf320fBaB4b0c8C56d8122663b3cf4acA67c";

const Artwork: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const setupEthers = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const signer = provider.getSigner();
          setSigner(signer);
        } catch (error) {
          console.error("User rejected connection", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };

    setupEthers();
  }, []);

  useEffect(() => {
    if (signer) {
      fetchAndMintCollage();
    }
  }, [signer]);

  const fetchAndMintCollage = async () => {
    if (!signer) return;

    try {
      const puzzleContract = new ethers.Contract(
        PUZZLE_CONTRACT_ADDRESS,
        puzzleContractABI,
        signer
      );
      const address = await signer.getAddress();
      const userTokens = await puzzleContract.getUserTokens(address);

      if (userTokens.length !== 3) {
        console.error("User doesn't have exactly 3 NounsPuzzle NFTs");
        return;
      }

      const [head, body, accessory] = await Promise.all([
        puzzleContract.getTraitNumber(userTokens[0]),
        puzzleContract.getTraitNumber(userTokens[1]),
        puzzleContract.getTraitNumber(userTokens[2]),
      ]);

      // Generate image URL
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          head: Number(head),
          body: Number(body),
          accessory: Number(accessory),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl);

        // Mint the collage NFT
        await mintCollageNFT(data.imageUrl);
      } else {
        console.error("Failed to fetch the image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching and minting collage:", error);
    }
  };

  const mintCollageNFT = async (imageUrl: string) => {
    if (!signer) return;

    try {
      const collageContract = new ethers.Contract(
        COLLAGE_CONTRACT_ADDRESS,
        collageContractABI,
        signer
      );

      // Create metadata
      const metadata = JSON.stringify({
        name: "Nouns Collage",
        description: "A collage of Nouns NFT pieces",
        image: imageUrl,
      });

      // Upload metadata to IPFS or your preferred storage
      // For this example, we'll assume you have an API endpoint to handle this
      const metadataResponse = await fetch("/api/uploadMetadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: metadata,
      });

      if (!metadataResponse.ok) {
        throw new Error("Failed to upload metadata");
      }

      const { metadataUrl } = await metadataResponse.json();

      // Mint the collage NFT
      const tx = await collageContract.mintCollage(metadataUrl);
      await tx.wait();

      console.log("Collage NFT minted successfully!");
    } catch (error) {
      console.error("Error minting collage NFT:", error);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1>You have minted a new artwork!</h1>
      <section className="flex flex-col items-center">
        {imageUrl && <img src={imageUrl} alt="Generated NFT" />}
      </section>
    </section>
  );
};

export default Artwork;
