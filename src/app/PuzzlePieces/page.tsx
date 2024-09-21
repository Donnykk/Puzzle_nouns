"use client";
import React, { useState, useEffect } from "react";
import Header from "../PuzzleNoun/Header";
import Footer from "../PuzzleNoun/Footer";

import Link from "next/link";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share"; // Import react-share buttons
import WoodenFrame from "./WoodenFrame"; // Import the WoodenFrame component
import PuzzleGrid from "./PuzzleGrid";
import Artwork from "./Artwork";


interface PuzzlePiecesProps { }

const PuzzlePieces: React.FC<PuzzlePiecesProps> = () => {
  const [isClient, setIsClient] = useState(false); // Track if the component is running on client
  const [currentUrl, setCurrentUrl] = useState('');
  const [pieceNum, setPieceNum] = useState<number>(1);
  const [showArtwork, setShowArtwork] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentUrl(window.location.href);

    //update piece_num
    setPieceNum(27);
  }, []);

  const headPuzzlePieces = Array.from({ length: Math.min(pieceNum, 9) }, (_, index) => ({
    src: `/pieces/piece_head_${index + 1}.png`
  }));
  const bodyPuzzlePieces = Array.from({ length: (pieceNum - 9) > 0 ? Math.min(pieceNum - 9, 9) : 0 }, (_, index) => ({
    src: `/pieces/piece_body_${index + 1}.png`
  }));
  const accessoryPuzzlePieces = Array.from({ length: (pieceNum - 18) > 0 ? Math.min(pieceNum - 18, 9) : 0 }, (_, index) => ({
    src: `/pieces/piece_accessory_${index + 1}.png`
  }));

  const blankPuzzlePieces = Array.from({ length: 27 - pieceNum }, (_) => ({
    src: "https://via.placeholder.com/150?text=Blank",
  }));

  // Combine small and blank puzzle pieces
  const allPuzzlePieces = [...headPuzzlePieces, ...bodyPuzzlePieces, ...accessoryPuzzlePieces, ...blankPuzzlePieces];

  const handleFormArtwork = () => {
    // Placeholder for future functionality
    // For example, opening a modal or navigating to another page
    setShowArtwork(true);
    console.log("Form an Artwork button clicked!");
    alert("Form an Artwork functionality to be implemented.");
  };

  return (
    <>
      <Header />
      <main className="flex overflow-hidden flex-col items-center px-0 pt-32 bg-white pb-[300px] max-md:px-5 max-md:py-16">
        <section className="flex flex-col w-full max-w-[1600px] max-md:max-w-full">

          <h1 className="self-center max-md:pt-24 font-bold text-black">
            Puzzle pieces (27/27)
          </h1>
          <div className="flex items-center self-center gap-4 justify-between mt-10 mr-10 max-w-[1200px]">
            <div className="flex items-center gap-4 text-lg">
              Gain your missing pieces:
              <Link href="/Quiz">
                <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                  Quiz
                </button>
              </Link>
              <div className="ml-2 flex space-x-2">
                <FacebookShareButton url={currentUrl} hashtag="#NounsNFT">
                  <div className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition" >
                    Share on Facebook
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={currentUrl} title="Check out my completed puzzle on Nouns NFT!" hashtags={["NounsNFT"]}>
                  <div className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition">
                    Share on Twitter
                  </div>
                </TwitterShareButton>
                <LinkedinShareButton url={currentUrl} summary="Check out my completed puzzle on Nouns NFT!" source="Nouns NFT">
                  <div className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition">
                    Share on LinkedIn
                  </div>
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full max-md:mt-6 max-md:max-w-full flex justify-center items-center">
            <div className="flex gap-6 max-md:flex-col">
              {/* Wooden Frame Wrapping the PuzzleGrid */}
              <WoodenFrame>
                <PuzzleGrid pieces={allPuzzlePieces} />
              </WoodenFrame>
            </div>
          </div>
          <button
            onClick={handleFormArtwork}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Form an Artwork
          </button>
          {showArtwork && <Artwork />}
          <Footer />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PuzzlePieces;