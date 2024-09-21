import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { create } from 'ipfs-http-client';

const OPENAI_API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/images/generations';

let nft_urls = [];
let piece_urls = [];
let pic_index = 1;

// IPFS client
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Function to upload a file
async function uploadPieceToIPFS(filePath: string) {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add(file);
    const imageUrl = `https://ipfs.infura.io/ipfs/${result.path}`;
    return imageUrl;
}

async function uploadNFTToIPFS(filePath: string, metadata: sharp.Metadata, characteristic: string) {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add(file);
    const imageUrl = `https://ipfs.infura.io/ipfs/${result.path}`;
    const metadataResult = await ipfs.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.infura.io/ipfs/${metadataResult.path}`;
    const characteristicResult = await ipfs.add(JSON.stringify(characteristic));
    const characteristicUrl = `https://ipfs.infura.io/ipfs/${characteristicResult.path}`;
    return { imageUrl, metadataUrl, characteristicUrl };
}


async function generateNFT(prompt: string): Promise<string> {
    try {
        const modifiedPrompt = `a pixel character featuring wearing oversized glasses and a unique hat and having small body and ${prompt}`;
        const response = await axios.post(
            API_URL,
            {
                prompt: modifiedPrompt,
                n: 1,
                size: '1024x1024',
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const imageUrl = response.data.data[0].url;
        console.log(imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error generating NFT:', error);
        throw error;
    }
}

async function getImageMetadata(imageUrl: string) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);
    const metadata = await sharp(imageBuffer).metadata();
    return metadata
}


async function cutImageIntoPieces(imagePath: string, index: Number) {
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
            const outputDir = path.join(process.cwd(), 'src/app/img/pieces');
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
                await img.toFile(path.join(outputDir, `piece_${index}_${row}_${col}.png`));
                const url = await uploadPieceToIPFS(path.join(outputDir, `piece_${index}_${row}_${col}.png`))
                piece_urls.push(url);
                console.log(url);
            } else {
                console.warn(`Skipping extraction for row ${row}, col ${col} due to invalid size`);
            }
        }
    }
}



export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }
        const imageUrl = await generateNFT(prompt);
        // Define the path to save the image
        const filePath = path.join(process.cwd(), 'src/app/img/origin/origin${pic_index}.png');
        // Download and save the image locally
        const metadata = await getImageMetadata(imageUrl);
        console.log(metadata);
        await cutImageIntoPieces(filePath, pic_index);
        pic_index++;
        const url = await uploadNFTToIPFS(filePath, metadata, prompt);
        console.log(url);
        nft_urls.push(url);
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
