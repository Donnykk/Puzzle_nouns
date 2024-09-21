import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generatePiece(prompt: string, index: number) {
    const imagePath = path.join(process.cwd(), `public/${prompt}/${index}.svg`)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            console.log(imagePath);
            const image = sharp(imagePath);
            const metadata = await image.metadata();
            console.log(metadata)
            const size = metadata.width;
            if (!size || metadata.height !== size) {
                throw new Error('Image is not square!');
            }

            // Use Math.floor to ensure pieceSize is an integer
            const pieceSize = Math.floor(size / 3);
            const outputDir = path.join(process.cwd(), 'public/pieces');
            const left = col * pieceSize;
            const top = row * pieceSize;

            // Calculate the width and height, ensuring they don't exceed the image size
            let width = pieceSize;
            let height = pieceSize;

            // Adjust width/height if they exceed the boundaries of the image
            if (left + width > size) {
                width = size - left;
            }
            if (top + height > size) {
                height = size - top;
            }

            console.log(`Image dimensions: ${left}x${top}x${width}x${height}`);


            // Ensure width and height are positive integers
            if (width > 0 && height > 0) {
                const img = image.extract({ left, top, width, height });
                const piece_id = 3 * row + col + 1;
                await img.toFile(path.join(outputDir, `piece_${prompt}_${piece_id}.svg`));
            } else {
                console.warn(`Skipping extraction for row ${row}, col ${col} due to invalid size`);
            }
        }
    }
}

async function generateNFT(promptHead: number, promptBody: number, promptAccessory: number) {
    return `https://api.cloudnouns.com/v1/pfp?head=${promptHead}&body=${promptBody}&accessory=${promptAccessory}`;
};

async function generateRandomNum(prompt: string) {
    let sum = 0;
    for (let i = 0; i < prompt.length; i++) {
        sum += prompt.charCodeAt(i) * (i + 1); // Weight by position
    }
    return sum;
}

export async function POST(req: NextRequest) {
    try {
        const { promptHead, promptBody, promptAccessory } = await req.json();
        if (!promptHead || !promptBody || !promptAccessory) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }
        const head = await generateRandomNum(promptHead) % 234;
        const body = await generateRandomNum(promptBody) % 30;
        const accessory = await generateRandomNum(promptAccessory) % 137;
        console.log({ head }, { body }, { accessory })
        const imageUrl = await generateNFT(head, body, accessory);
        await generatePiece("head", head);
        await generatePiece("body", body);
        await generatePiece("accessory", accessory);
        console.log(imageUrl);
        return NextResponse.json({ imageUrl, head, body, accessory });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
