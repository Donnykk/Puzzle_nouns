import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center px-12 pt-32 pb-10 mt-2 w-full text-6xl font-bold text-white max-w-[1800px] min-h-[359px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:pt-24 max-md:max-w-full max-md:text-4xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/27ee40145b747cf2f2cce1954a62f6867c48715e264061ef02a0b318245f30b0?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
        alt=""
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <h2 className="relative z-10 text-center text-2xl mt-auto">
        "Create your Nous NFT with AI<br></br> Art created by countless Nouns."
      </h2>
    </section>
  );
};

export default Hero;
