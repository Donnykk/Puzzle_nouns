
import React from "react";
import Header from "./FormArtwork/Header";
import Hero from "./PuzzleNoun/Hero";
import Footer from "./PuzzleNoun/Footer";
import PuzzleSteps from "./PuzzleNoun/PuzzleSteps";
const PuzzleNouns: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <Header />
        <Hero />
        <PuzzleSteps />
        <Footer />
      </div>
    </div>
  );
};

export default PuzzleNouns;
