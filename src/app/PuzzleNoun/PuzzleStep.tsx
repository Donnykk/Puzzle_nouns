import Link from "next/link";
import React from "react";

interface PuzzleStepProps {
  title: string;
  imageSrc: string;
  iconSrc?: string;
  to: string;
}

const PuzzleStep: React.FC<PuzzleStepProps> = ({
  title,
  imageSrc,
  iconSrc,
  to
}) => {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow mt-3.5 text-4xl font-bold text-black max-md:mt-10">
        <h3 className="self-center">{title}</h3>
        <Link href={to}>
          <img
            loading="lazy"
            src={imageSrc}
            alt=""
            className="object-contain mt-3.5 w-full aspect-[1.29]"
          />
        </Link>

        {iconSrc && (
          <img
            loading="lazy"
            src={iconSrc}
            alt=""
            className="object-contain mt-11 ml-12 aspect-[1.77] w-[23px] max-md:mt-10 max-md:ml-2.5"
          />
        )}
      </div>
    </div>
  );
};

export default PuzzleStep;
