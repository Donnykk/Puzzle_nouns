"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "../PuzzleNoun/Header";
import Footer from "../PuzzleNoun/Footer";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import WoodenFrame from "./WoodenFrame";
import PuzzleGrid from "./PuzzleGrid";
import Artwork from "./Artwork";
import contractABI from "../NounsPuzzle.json"; // Make sure this path is correct

const CONTRACT_ADDRESS = "0x1654Cf320fBaB4b0c8C56d8122663b3cf4acA67c";

interface PuzzlePiecesProps { }

const PuzzlePieces: React.FC<PuzzlePiecesProps> = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [headPieceNum, setHeadPieceNum] = useState<number>(0);
  const [bodyPieceNum, setBodyPieceNum] = useState<number>(0);
  const [accessoryPieceNum, setAccessoryPieceNum] = useState<number>(0);
  const [showArtwork, setShowArtwork] = useState<boolean>(false);
  const [showTrait, setShowTrait] = useState<boolean>(false)
  const [argToMint, setArgToMint] = useState("head");
  const [numToMint, setNumToMint] = useState<number>(0)
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userTokens, setUserTokens] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    setCurrentUrl(window.location.href);
    setShowTrait(false);
    const setupEthers = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        try {
          // Request account access
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
      fetchUserTokens();
    }
  }, [signer]);

  useEffect(() => {
    if (userTokens.length > 0) {
      fetchUnlockedPieces();
    }
  }, [userTokens]);

  const fetchUserTokens = async () => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );
      const address = await signer.getAddress();
      const tokens = await contract.getUserTokens(address);
      setUserTokens(tokens.map((token: ethers.BigNumberish) => Number(token)));
    } catch (error) {
      console.error("Error fetching user tokens:", error);
    }
  };

  const fetchUnlockedPieces = async () => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );
      const [head, body, accessory] = await Promise.all([
        contract.getUnlockedPieces(userTokens[0]),
        contract.getUnlockedPieces(userTokens[1]),
        contract.getUnlockedPieces(userTokens[2]),
      ]);
      setHeadPieceNum(Number(head));
      if (headPieceNum == 9 && argToMint == "head") {
        //mint
        setArgToMint("body");
        setNumToMint(1);
        setShowTrait(true);
      }
      setBodyPieceNum(Number(body));
      if (bodyPieceNum == 9 && argToMint == "body") {
        setArgToMint("accessory");
        setNumToMint(1);
        setShowTrait(true);
      }
      setAccessoryPieceNum(Number(accessory));
      if (accessoryPieceNum == 9 && argToMint == "accessory") {
        setNumToMint(1);
        setShowTrait(true);
      }
    } catch (error) {
      console.error("Error fetching unlocked pieces:", error);
    }
  };

  const headPuzzlePieces = Array.from({ length: headPieceNum }, (_, index) => ({
    src: `/pieces/piece_head_${index + 1}.png`,
  }));
  const blankHeadPuzzlePieces = Array.from(
    { length: 9 - headPieceNum },
    (_) => ({
      src: "https://via.placeholder.com/150?text=Blank",
    })
  );
  const bodyPuzzlePieces = Array.from({ length: bodyPieceNum }, (_, index) => ({
    src: `/pieces/piece_body_${index + 1}.png`,
  }));
  const blankBodyPuzzlePieces = Array.from(
    { length: 9 - bodyPieceNum },
    (_) => ({
      src: "https://via.placeholder.com/150?text=Blank",
    })
  );
  const accessoryPuzzlePieces = Array.from(
    { length: accessoryPieceNum },
    (_, index) => ({
      src: `/pieces/piece_accessory_${index + 1}.png`,
    })
  );
  const blankAccessoryPuzzlePieces = Array.from(
    { length: 9 - accessoryPieceNum },
    (_) => ({
      src: "https://via.placeholder.com/150?text=Blank",
    })
  );

  const allPuzzlePieces = [
    ...headPuzzlePieces,
    ...blankHeadPuzzlePieces,
    ...bodyPuzzlePieces,
    ...blankBodyPuzzlePieces,
    ...accessoryPuzzlePieces,
    ...blankAccessoryPuzzlePieces,
  ];

  const handleFormArtwork = () => {
    setShowArtwork(true);
    console.log("Form an Artwork button clicked!");
  };

  return (
    <>
      <Header />
      <main className="flex overflow-hidden flex-col items-center px-0 pt-12 bg-white pb-[300px] max-md:px-5 max-md:py-16">
        <section className="flex flex-col w-full max-w-[1600px] max-md:max-w-full">
          <h1 className="self-center max-md:pt-12 text-2xl font-bold text-black">
            Puzzle pieces ({headPieceNum + bodyPieceNum + accessoryPieceNum}/27)
          </h1>
          <div className="flex items-center self-center gap-4 justify-between mt-10 mr-10 max-w-[1200px]">
            <div className="flex items-center gap-4 text-lg">
              Gain your missing pieces:
              <Link href="/Quiz">
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                  Quiz
                </button>
              </Link>
              <div className="ml-2 flex space-x-2">
                <FacebookShareButton url={currentUrl} hashtag="#NounsNFT">
                  <div className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                    Share on Facebook
                  </div>
                </FacebookShareButton>
                <TwitterShareButton
                  url={currentUrl}
                  title="Check out my completed puzzle on Nouns NFT!"
                  hashtags={["NounsNFT"]}>
                  <div className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition">
                    Share on Twitter
                  </div>
                </TwitterShareButton>
                <LinkedinShareButton
                  url={currentUrl}
                  summary="Check out my completed puzzle on Nouns NFT!"
                  source="Nouns NFT">
                  <div className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition">
                    Share on LinkedIn
                  </div>
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full max-md:mt-6 max-md:max-w-full flex justify-center items-center">
            <div className="flex gap-6 max-md:flex-col">
              <WoodenFrame>
                <PuzzleGrid pieces={allPuzzlePieces} />
              </WoodenFrame>
            </div>
          </div>
          <button
            onClick={handleFormArtwork}
            className="max-w-[600px] self-center mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
            Form an Artwork
          </button>
          {showArtwork && <Artwork />}
          {showTrait && <img src={`/${argToMint}/${numToMint}.svg`} />}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PuzzlePieces;
