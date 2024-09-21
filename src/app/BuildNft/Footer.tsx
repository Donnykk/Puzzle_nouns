import React from "react";
import FooterColumn from "./FooterColumn";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col py-14 pr-1.5 mt-10 w-full bg-gray-950 max-md:max-w-full">
      <div className="self-end mr-28 max-w-full w-[1200px] max-md:mr-2.5">
        <div className="flex gap-5 max-md:flex-col">
          <FooterColumn title="About Us" />
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full text-base w-[300px] text-stone-300 max-md:mt-10">
              <h3 className="self-start text-2xl uppercase text-zinc-500">
                Follow Us
              </h3>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 mt-12 h-px bg-neutral-500 max-md:mt-10 max-md:max-w-full" />
    </footer>
  );
};

export default Footer;
