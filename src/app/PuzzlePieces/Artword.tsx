"use client";
import React, { useState, useEffect } from "react";

const Artwork: React.FC = () => {
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("/api/form");
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.imageUrl);
                } else {
                    console.error("Failed to fetch the image:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, []);

    return (
        <section className="flex flex-col items-center">
            <section className="flex flex-col items-center">
                <section className="flex flex-col items-center">
                    {imageUrl && <img src={imageUrl} alt="Generated NFT" />}
                </section>
            </section>
        </section>
    );
};

export default Artwork;