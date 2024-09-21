import React from "react";
import PuzzleStep from "./PuzzleStep";

const steps = [
  {
    title: "Puzzle Pieces",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/06be37a37d69506524a66dfa9c63256a79f2f78dfa425f983964f08fdd24d04a?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3668580fc7c81e8dd2fb6298e2667dee076ed4f7014479ffb344a82c2c4aa803?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    to: "/PuzzlePieces"
  },
  {
    title: "Build Nouns NFT",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/92aef7bfe3fb0e62d78b1d4ca4331b8bb981bc1caa5a6dc2ed5cfba1a03e869d?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    to:"/BuildNft"
  },
];

const PuzzleSteps: React.FC = () => {
  return (
    <section className="mt-28 w-full max-w-[1260px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        {steps.map((step, index) => (
          <PuzzleStep key={index} {...step} />
        ))}
      </div>
    </section>
  );
};

export default PuzzleSteps;
