import React from "react";
import Header from "../PuzzleNoun/Header";
import Build from "./Build";
import Footer from "./Footer";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NFTBuild: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <ConnectButton />

      <Build />
      <Footer />
    </div>
  );
};

export default NFTBuild;
