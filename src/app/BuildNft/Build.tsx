// pages/api/build.ts
"use client";
import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NFTBuild: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("https://cdn.builder.io/api/v1/image/assets/TEMP/190941a49234a5cc99955e16da78324bd6f5eb5c05ea71b4e39cab1555a78128?placeholderIfAbsent=true&apiKey=0f10dcf47d4a4bb986b4f458dff7f90a")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/build", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
    console.log('Generated NFT image URL:', imageUrl);
};

return (
    <section className="flex flex-col items-center">
        <img
            loading="lazy"
            src={imageUrl}
            alt="AI Generated NFT"
            className="object-contain mt-3 w-[800px] aspect-[2]"
        />
        <form method="POST" onSubmit={handleSubmit} className="relative flex items-center mt-5">
            <i className="fa-solid fa-search absolute left-3 text-gray-500" />
            <input
                aria-label="prompt"
                type="text"
                className="pl-10 p-2 border-white rounded-md w-[600px]"
                placeholder="Enter a simple AI prompt to generate your own nouns"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded-md">
                Generate
            </button>
        </form>
    </section>
);
};

export default NFTBuild;
