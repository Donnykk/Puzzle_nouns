import React from "react";

interface FooterColumnProps {
  title: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title }) => {
  const links = [
    ["Fundraising Ideas", "Blog"],
    ["Pricing", "Terms of Use"],
    ["Privacy Policy", "FAQ"],
    ["About Us", "Sales"],
    ["Support", "Press"],
  ];

  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-10">
        <h3 className="self-start text-2xl uppercase text-zinc-500">{title}</h3>
        <div className="flex gap-5 justify-between mt-10 text-base text-stone-300">
          {links.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col items-start">
              {column.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href="#"
                  className={linkIndex > 0 ? "mt-5" : "self-stretch"}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterColumn;