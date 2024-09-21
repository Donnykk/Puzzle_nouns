import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { create } from 'ipfs-http-client';

const OPENAI_API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/images/generations';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

let pic_index = 1;

async function uploadImageToIPFS(imagePath: string) {
    const file = fs.readFileSync(imagePath);
    const result = await ipfs.add(file);
    return result.path;
}

async function generateNFT(prompt: string): Promise<string> {
    try {
        const modifiedPrompt = `${prompt} and a pixel art character in the style of Nouns, featuring colorful, cartoonish character with oversized glasses and a unique hat and small body`;
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
        return imageUrl;
    } catch (error) {
        console.error('Error generating NFT:', error);
        throw error;
    }
}

// Helper function to download and save the image
async function downloadImage(imageUrl: string, filePath: string) {
    const writer = fs.createWriteStream(filePath);
    const response = await axios.get(imageUrl, { responseType: 'stream' });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function cutImageIntoPieces(imagePath: string, index: Number) {
    const cids = [];
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
                await image.extract({ left, top, width, height }).toFile(path.join(outputDir, `piece_${index}_${row}_${col}.png`));
                const cid = await uploadImageToIPFS(path.join(outputDir, `piece_${index}_${row}_${col}.png`));
                cids.push(cid);
            } else {
                console.warn(`Skipping extraction for row ${row}, col ${col} due to invalid size`);
            }
        }
    }
    return cids;
}



export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const imageUrl = await generateNFT(prompt);

        // Define the path to save the image
        if (pic_index == 1) {
            const filePath = path.join(process.cwd(), 'src/app/img/origin/origin1.png');
            // Download and save the image locally
            await downloadImage(imageUrl, filePath);
            await cutImageIntoPieces(filePath, pic_index);
            pic_index++;
        } else if (pic_index == 2) {
            const filePath = path.join(process.cwd(), 'src/app/img/origin/origin2.png');
            // Download and save the image locally
            await downloadImage(imageUrl, filePath);
            await cutImageIntoPieces(filePath, pic_index);
            pic_index++;
        } else if (pic_index == 3) {
            const filePath = path.join(process.cwd(), 'src/app/img/origin/origin3.png');
            // Download and save the image locally
            await downloadImage(imageUrl, filePath);
            await cutImageIntoPieces(filePath, pic_index);
            pic_index++;
        } else {
            alert("You already generated 3 pictures!");
        }
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
