
import React from "react";

const ImageSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f58b3d2febd88d5df1354ae6822660d7cb53e0ea2472f7baf138e959e3682d4e?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
        alt=""
        className="object-contain self-center mt-28 max-w-full aspect-[23.26] w-[718px] max-md:mt-10"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets%2F0f10dcf47d4a4bb986b4f458dff7f90a%2F39cfd9e5f7014bc29483a02b2767440a"
        alt=""
        className="box-border object-cover overflow-hidden shrink-0 mt-5 w-full aspect-[2.93] min-h-[20px] min-w-[20px]"
      />
    </section>
  );
};

export default ImageSection;
