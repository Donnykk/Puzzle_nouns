
import React from "react";
import ArtworkSection from "./ArtworkSection";

const MainContent: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold text-black text-center max-md:mt-10 max-md:max-w-full">
        A new artwork is formed
      </h2>
      <ArtworkSection />
    </main>
  );
};

export default MainContent;

