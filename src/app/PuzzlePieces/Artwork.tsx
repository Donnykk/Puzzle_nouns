"use client";
import React, { useState, useEffect } from "react";

const Artwork: React.FC = () => {
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // input the numbers
                const head = 14;
                const body = 2;
                const accessory = 10;
                const response = await fetch("/api/form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ head, body, accessory }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.imageUrl);
                    // mint?
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
                <h1>You have minted a new artwork!</h1>
                <section className="flex flex-col items-center">
                    {imageUrl && <img src={imageUrl} alt="Generated NFT" />}
                </section>
            </section>
        </section>
    );
};

export default Artwork;
