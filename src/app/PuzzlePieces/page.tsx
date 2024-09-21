"use client";
import React, { useState, useEffect } from "react";
import PuzzleGrid from "./PuzzleGrid";
import PuzzleImage from "./PuzzleImage";
import Header from "../FormArtwork/Header";
import Footer from "../PuzzleNoun/Footer";

import Link from "next/link";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share"; // Import react-share buttons
import WoodenFrame from "./WoodenFrame"; // Import the WoodenFrame component


interface PuzzlePiecesProps { }

const PuzzlePieces: React.FC<PuzzlePiecesProps> = () => {
  const [isClient, setIsClient] = useState(false); // Track if the component is running on client
  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    setIsClient(true); // Component is mounted on the client
    setCurrentUrl(window.location.href);
  }, [])
  const smallPuzzlePieces = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8ee26f0ea7b344b2983fa75d0cb08b222468584704e848236f4688ba31c7cb62?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8cff8cadd4a4d75179a5d78551b1b06dbf6d7c30d1ae25c0872c079a2702dfc?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/212aded32f1371145e656efa1d4561e8048b389afc1bf9ca2f20cae639407721?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6cddd32dddba7eff772dcd4cdab72c0f005e8158167e59b8eb162a35eb230044?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 4",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f76aa15190eeee5f35e7654e189a0d1e5cf9126e3ea162bcc7418dc74d0166fc?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 5",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/40031fd16db51cb37727b9b867aa25a07ca8c24f0e13b50a37a5a3359320393e?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 6",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/62bf56ce33ff4332799a6161cc47e8cae3e9c60a16256207f3a25561d56397ab?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 7",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1572ef675b1be4ebcf87f8c4d3751853271b44c0fb2f329be8b4292f1bc693af?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
      alt: "Puzzle piece 8",
    },
  ];

  // Create 19 blank puzzle pieces
  const blankPuzzlePieces = Array.from({ length: 19 }, (_, index) => ({
    src: "https://via.placeholder.com/150?text=Blank",
    alt: `Blank puzzle piece ${index + 1}`,
  }));

  // Combine small and blank puzzle pieces
  const allPuzzlePieces = [...smallPuzzlePieces, ...blankPuzzlePieces];

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
                <PuzzleGrid
                  pieces={allPuzzlePieces}
                  onSelect={function (index: number): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </WoodenFrame>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
};

export default PuzzlePieces;