
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between self-end mr-9 w-full max-w-[1750px] max-md:mr-2.5 max-md:max-w-full">
      <h1 className="text-3xl font-bold uppercase self-end text-zinc-500">
        Puzzle Nouns
      </h1>
      <nav className="flex flex-wrap gap-10 items-start self-end max-md:max-w-full">
        <ul className="ml-32 text-lg text-black">
          <li className="inline-block mr-20">
            <Link href="/PuzzleNoun" className="text-zinc-500">
              Home
            </Link>
          </li>
          <li className="inline-block mr-20">
            <a href="#" className="text-zinc-500">
              About us
            </a>
          </li>
          <li className="inline-block mr-20">
            <a href="#" className="text-zinc-500">
              Event
            </a>
          </li>
        </ul>
      </nav>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4efa881f390809658c373c41f193a7101d3b49be86d2e68002618c658c1d3b82?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a"
        alt=""
        className="object-contain shrink-0 aspect-[1.05] w-[45px]"
      />
    </header>
  );
};

export default Header;
