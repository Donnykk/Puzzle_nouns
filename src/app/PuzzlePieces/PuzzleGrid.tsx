import React from "react";

interface PuzzleGridProps {
    pieces: { src: string; }[];
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ pieces }) => {
    return (
        <div className="grid grid-cols-9 gap-2 max-md:grid-cols-3">
            {pieces.map((piece, index) => (
                <img key={index} src={piece.src} className="w-full h-auto border" />
            ))}
        </div>
    );
};

export default PuzzleGrid;