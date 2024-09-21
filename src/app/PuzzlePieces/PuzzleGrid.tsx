// src/app/PuzzlePieces/PuzzleGrid.tsx

"use client"; // Enables client-side interactivity

import React from "react";
import PuzzleImage from "./PuzzleImage";

interface PuzzlePiece {
  src: string;
  alt: string;
}

interface PuzzleGridProps {
  pieces: PuzzlePiece[];
  selectedPieces?: Set<number>; // Made optional with default
  onSelect: (index: number) => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  pieces,
  selectedPieces = new Set(),
  onSelect,
}) => {
  if (!pieces || pieces.length === 0) {
    return <div>No puzzle pieces available.</div>;
  }

  return (
    <div className="grid grid-cols-9 gap-2 max-md:grid-cols-3">
      {pieces.map((piece, index) => (
        <PuzzleImage
          key={index}
          src={piece.src}
          alt={piece.alt}
          isSelected={selectedPieces.has(index)}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
};

export default PuzzleGrid;
