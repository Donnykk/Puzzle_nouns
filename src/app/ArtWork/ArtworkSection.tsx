
import React from "react";

const ArtworkSection: React.FC = () => {
  return (
    <section className="mt-36 w-full max-w-[1222px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c80ba5c3ff9852d049ebc1d830eb394164bda66c746ebe012efbf88e23ecd309?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
            alt="New artwork formation"
            className="object-contain grow w-full aspect-[1.18] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-60 text-4xl font-bold text-black max-md:mt-10 max-md:max-w-full">
            <h3 className="self-start">
              form by nouns :<br />
            </h3>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d6b38c09083d2592faff1b3ecea827bd31eed31168f80df5e2dcfb90e20caf0?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
              alt="Form by nouns illustration"
              className="object-contain mt-20 w-full aspect-[2.89] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtworkSection;
