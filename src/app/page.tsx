import React from "react";
import Header from "./PuzzleNoun/Header";
import Hero from "./PuzzleNoun/Hero";
import Footer from "./PuzzleNoun/Footer";
import PuzzleSteps from "./PuzzleNoun/PuzzleSteps";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const PuzzleNouns: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <Header />
        <ConnectButton />
        <Hero />
        <PuzzleSteps />
        <Footer />
      </div>
    </div>
  );
};

export default PuzzleNouns;
