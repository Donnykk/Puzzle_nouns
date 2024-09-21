// src/app/PuzzlePieces/PuzzleImage.tsx

import React from "react";

interface PuzzleImageProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const PuzzleImage: React.FC<PuzzleImageProps> = ({ src, alt, isSelected, onClick, className }) => {
  const isBlank = alt.toLowerCase().includes("blank");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      className={`relative w-16 h-16 flex items-center justify-center overflow-hidden cursor-pointer border ${
        isSelected ? "border-blue-500" : isBlank ? "border-gray-300" : "border-transparent"
      } ${isBlank ? "bg-gray-200" : ""} hover:scale-105 transition-transform duration-200 ${className}`}
      title={isBlank ? "Blank Piece" : `Select ${alt}`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-25"></div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/150?text=Error";
        }}
      />
    </div>
  );
};

export default PuzzleImage;
