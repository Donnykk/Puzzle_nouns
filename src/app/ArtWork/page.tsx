import React from "react";
import Header from "../PuzzleNoun/Header";
import MainContent from "./word";
import Footer from "../PuzzleNoun/Footer";
const PuzzleNouns: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default PuzzleNouns;
