import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col self-center items-center px-12 pt-32 pb-10 mt-2 w-full text-6xl font-bold text-white max-w-[1800px] min-h-[359px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:pt-24 max-md:max-w-full max-md:text-4xl">
      <img
        loading="lazy"
        src={"/image.png"}
        alt=""
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <h2 className="relative z-20 text-center text-2xl mt-80">
        `Create your Nouns NFT and mint with educational questions!`
      </h2>
    </section>
  );
};

export default Hero;
