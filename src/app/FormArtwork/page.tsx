// src/app/FormArtwork/FormArtwork.tsx

"use client"; // Marking this file as a Client Component

import React, { useState } from "react"; 
import Header from "./Header";
import Footer from "../PuzzleNoun/Footer";
import PuzzleGrid from "../PuzzlePieces/PuzzleGrid";
import WoodenFrame from "../PuzzlePieces/WoodenFrame"; // Adjust the import path as necessary

interface PuzzlePiece {
  src: string;
  alt: string;
}

const FormArtwork: React.FC = () => {
  const smallPuzzlePieces: PuzzlePiece[] = [
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
  const blankPuzzlePieces: PuzzlePiece[] = Array.from({ length: 19 }, (_, index) => ({
    src: "https://via.placeholder.com/150?text=Blank",
    alt: `Blank puzzle piece ${index + 1}`,
  }));

  // Combine small and blank puzzle pieces
  const allPuzzlePieces: PuzzlePiece[] = [...smallPuzzlePieces, ...blankPuzzlePieces];

  // State to track selected pieces
  const [selectedPieces, setSelectedPieces] = useState<Set<number>>(new Set());

  // Handler to toggle selection
  const handleSelect = (index: number) => {
    setSelectedPieces((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  // Handler to select all pieces
  const handleSelectAll = () => {
    const allIndices = allPuzzlePieces.map((_, index) => index);
    setSelectedPieces(new Set(allIndices));
  };

  // Check if all 27 pieces are selected
  const allSelected = selectedPieces.size === allPuzzlePieces.length;

  // Handler for "Form an Artwork" button
  const handleFormArtwork = () => {
    // Placeholder for future functionality
    // For example, opening a modal or navigating to another page
    console.log("Form an Artwork button clicked!");
    alert("Form an Artwork functionality to be implemented.");
  };

  return (
    <div className="flex overflow-hidden flex-col bg-white min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4 pt-12 pb-24">
        <section className="w-full max-w-6xl">
          <h1 className="text-center text-2xl font-bold mb-4">
            Puzzle pieces (27/27)
          </h1>
          {/* "Select All" Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                allSelected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
              disabled={allSelected}
            >
              {allSelected ? "All Selected" : "Select All"}
            </button>
          </div>
          <WoodenFrame>
            <PuzzleGrid
              pieces={allPuzzlePieces}
              selectedPieces={selectedPieces}
              onSelect={handleSelect}
            />
          </WoodenFrame>
          <div className="mt-4 text-center text-lg">
            Selected Pieces: {selectedPieces.size}/{allPuzzlePieces.length}
          </div>
          {allSelected && (
            <button
              onClick={handleFormArtwork}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Form an Artwork
            </button>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FormArtwork;
