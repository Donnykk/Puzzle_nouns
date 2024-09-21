
import React from "react";
import Header from "../FormArtwork/Header";
import Hero from "./Hero";
import PuzzleSteps from "./PuzzleSteps";
import Footer from "./Footer";

const PuzzleNouns: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <PuzzleSteps />
      <Footer />
    </div>
  );
};

export default PuzzleNouns;