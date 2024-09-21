// src/app/PuzzlePieces/WoodenFrame.tsx

import React from "react";

interface WoodenFrameProps {
  children: React.ReactNode;
}

const WoodenFrame: React.FC<WoodenFrameProps> = ({ children }) => {
  return (
    <div
      className="wooden-frame p-4 border-8 border-[#8b4513] rounded-lg shadow-lg bg-gradient-to-b from-[#deb887] to-[#d2b48c] flex justify-center items-center"
      // If using a background image, uncomment the following line and set the correct path
      // style={{ backgroundImage: "url('/path-to-your-wood-texture.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {children}
    </div>
  );
};

export default WoodenFrame;