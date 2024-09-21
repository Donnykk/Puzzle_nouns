import React from "react";
import Header from "../FormArtwork/Header";
import Build from "./Build";
import Footer from "./Footer";

const NFTBuild: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <Build />
            <Footer />
        </div>
    );
};

export default NFTBuild;
