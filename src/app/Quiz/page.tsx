"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import Header from "../PuzzleNoun/Header";
import Footer from "../PuzzleNoun/Footer";
import Link from "next/link";
import contractABI from "../NounsPuzzle.json"; // Make sure this path is correct
import * as dotenv from "dotenv";

//dotenv.config();
dotenv.config();
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
console.log("asdasd" + PRIVATE_KEY);
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
console.log("sakjdlkjd" + RPC_URL);

const CONTRACT_ADDRESS = "0xF941038E7196fdbF4FB54e01710207E00E7cD0Ab";


const PuzzleNouns: React.FC = () => {

  const [Question, setQuestion] = useState("");
  const [ChoiceA, setChoiceA] = useState("");
  const [ChoiceB, setChoiceB] = useState("");
  const [ChoiceC, setChoiceC] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Index, setIndex] = useState<number>(1);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [unlockedPieces, setUnlockedPieces] = useState<{
    [key: number]: number;
  }>({});
  const [userTokens, setUserTokens] = useState<number[]>([]);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

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
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (isConnected && address && provider) {
      fetchUserTokens();
    }
  }, [isConnected, address, provider]);

  useEffect(() => {
    if (userTokens.length > 0 && provider) {
      fetchUnlockedPieces();
    }
  }, [userTokens, provider]);

  const fetchQuizData = async () => {
    try {
      const response = await fetch("/api/getQuiz");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length > 0) {
        console.log("Index" + Index);
        setQuestion(data[Index - 1].Question);
        setChoiceA(data[Index - 1].ChoiceA);
        setChoiceB(data[Index - 1].ChoiceB);
        setChoiceC(data[Index - 1].ChoiceC);
        setAnswer(data[Index - 1].Answer);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const fetchUserTokens = async () => {
    if (!provider || !address) return;
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        provider
      );
      const tokens = await contract.getUserTokens(address);
      setUserTokens(tokens.map((token: ethers.BigNumberish) => Number(token)));
    } catch (error) {
      console.error("Error fetching user tokens:", error);
    }
  };

  const fetchUnlockedPieces = async () => {
    if (!provider) return;
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        provider
      );
      const unlockedPiecesData: { [key: number]: number } = {};

      for (const tokenId of userTokens) {
        const unlockedPieces = await contract.getUnlockedPieces(tokenId);
        // Check if unlockedPieces is a BigNumber or a regular number
        unlockedPiecesData[tokenId] = ethers.BigNumber.isBigNumber(
          unlockedPieces
        )
          ? unlockedPieces.toNumber()
          : Number(unlockedPieces);
      }

      setUnlockedPieces(unlockedPiecesData);
    } catch (error) {
      console.error("Error fetching unlocked pieces:", error);
    }
  };
  const unlockPuzzlePiece = async () => {
    if (userTokens.length === 0) {
      console.error("No user tokens available");
      return;
    }
    console.log("PRIVATE_KEY:", PRIVATE_KEY!.substring(0, 6) + "..."); // Log first 6 characters
    console.log("RPC_URL:", RPC_URL);

    try {
      // Create provider
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      console.log("Provider created");

      // Check network connection
      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name);

      const wallet = new ethers.Wallet(PRIVATE_KEY!);

      // Connect wallet to provider
      const connectedWallet = wallet.connect(provider);
      console.log("Wallet connected to provider");

      // Create contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, connectedWallet);
      console.log("Contract instance created");

      // Find a token that hasn't been fully unlocked
      const tokenToUnlock = userTokens.find(
        (tokenId) => (unlockedPieces[tokenId] || 0) < 9
      );

      if (!tokenToUnlock) {
        console.log("All tokens are fully unlocked");
        return;
      }

      console.log("Attempting to unlock piece for token:", tokenToUnlock);

      // Call the contract method
      const tx = await contract.unlockPuzzlePiece(tokenToUnlock);
      console.log("Transaction sent:", tx.hash);

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction confirmed in block:", receipt.blockNumber);

      console.log(`Puzzle piece unlocked successfully for token ${tokenToUnlock}`);

      // Update the unlocked pieces for this token
      setUnlockedPieces((prev) => ({
        ...prev,
        [tokenToUnlock]: (prev[tokenToUnlock] || 0) + 1,
      }));

      // Refetch user tokens to ensure we have the latest data
      fetchUserTokens();
    } catch (error) {
      console.error("Error in unlockPuzzlePiece:");
      console.error(error);
    }
  };

  const handleButtonClick = async (choice: string) => {
    console.log(`Button ${choice} was clicked!`);
    if (choice === Answer) {
      if (Index % 5 == 0) {
        // Unlock a piece
        await unlockPuzzlePiece();
        alert("Congratulations! You have earned a puzzle piece!");
        setShowLink(true);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      alert("Wrong answer. Try again!");
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <Header />
      <main className="flex flex-col items-center mt-10 px-40 py-10 bg-white shadow-md rounded-lg mx-auto max-w-full">
        <h1 className="text-3xl font-bold text-black mb-5">Blockchain Quiz</h1>
        {!isConnected && (
          <p className="text-red-500 mb-5">
            Please connect your wallet to play the quiz and earn puzzle pieces.
          </p>
        )}
        {showLink && (
          <Link
            href="/PuzzlePieces"
            className="mt-5 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
            View your pieces
          </Link>
        )}
        <div className="mt-5 mb-5 text-xl text-center font-medium">
          {Index}. {Question}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="button"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => handleButtonClick("A")}
            disabled={!isConnected}>
            A. {ChoiceA}
          </button>
          <button
            type="button"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            onClick={() => handleButtonClick("B")}
            disabled={!isConnected}>
            B. {ChoiceB}
          </button>
          <button
            type="button"
            className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => handleButtonClick("C")}
            disabled={!isConnected}>
            C. {ChoiceC}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PuzzleNouns;
