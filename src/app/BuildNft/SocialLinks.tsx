import React from "react";

interface SocialLinkProps {
  name: string;
  iconSrc: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ name, iconSrc }) => (
  <div className="flex flex-1 gap-3.5">
    <img
      loading="lazy"
      src={iconSrc}
      alt={`${name} icon`}
      className="object-contain shrink-0 w-6 aspect-[0.75]"
    />
    <span className="self-start">{name}</span>
  </div>
);

const SocialLinks: React.FC = () => {
  const socialLinks = [
    {
      name: "Facebook",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9155f88ce984bc15d812638a6bb69b7536966ba28b52bfaee7dd80184a178e49?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
    {
      name: "Twitter",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ea769abe6251303a82175ed007dc314c31bbb3586968804aaabc55e7f5a58ed9?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
    {
      name: "Instagram",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3810c153b54bfef14932ae147f9091b6ec4cfeb41102b24bd86ba6eacf41f75a?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
    {
      name: "Google+",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0ac707983749b704d59a1eb27f4eb2e702ed6eb62a55c5f1f09c84c6a29ca535?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
    {
      name: "Linkedin",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d1fe052864a604edeba3cff9ee6854ee53efe772ba002cb0a664fe802f5c0b11?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
    {
      name: "Blog",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/31d758dae10c661399fd63648d1ad620f3da3e1decb1bd3a5fd9ee89de1b5595?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a",
    },
  ];

  return (
    <>
      <div className="flex gap-10 mt-11 whitespace-nowrap max-md:mt-10 max-md:mr-2">
        <SocialLink {...socialLinks[0]} />
        <SocialLink {...socialLinks[1]} />
      </div>
      <div className="flex gap-10 mt-8 whitespace-nowrap">
        <SocialLink {...socialLinks[2]} />
        <SocialLink {...socialLinks[3]} />
      </div>
      <div className="flex gap-10 mt-8 whitespace-nowrap">
        <SocialLink {...socialLinks[4]} />
        <SocialLink {...socialLinks[5]} />
      </div>
    </>
  );
};

export default SocialLinks;