
import React from "react";

const SearchBar: React.FC = () => {
  return (
    <form className="flex gap-6 items-center self-end p-4 mt-4 mr-14 bg-white rounded-sm min-h-[48px] max-md:mr-2.5">
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="searchInput"
        className="object-contain self-stretch my-auto aspect-[31.25] min-w-[240px] w-[493px]"
        aria-label="Search"
      />
    </form>
  );
};

export default SearchBar;
