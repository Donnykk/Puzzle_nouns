import { NextRequest, NextResponse } from 'next/server';

async function generateArtwork(head: number, body: number, accessory: number) {
    // complete through smart contract
    const imageUrl = `https://api.cloudnouns.com/v1/pfp?head=${head}&body=${body}&accessory=${accessory}`;
    return imageUrl;
}


export async function POST(req: NextRequest) {
    try {
        const { head, body, accessory } = await req.json();
        const imageUrl = await generateArtwork(head, body, accessory);
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Error generating image:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}