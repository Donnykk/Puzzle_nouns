import { NextResponse } from 'next/server';
import Web3 from 'web3';

const web3 = new Web3;
const contractAddress = '0xCA67f533ACEeBd68946cDcfF047121eeE124EACA' //contract address
const contractABI = []

export async function mint_piece(recipient, isQuestion, metadata) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const ownerAddress = accounts[0];

    try {
        const result = await contract.methods.createPuzzlePiece(recipient, isQuestion, metadata).send({ from: ownerAddress });
        console.log('Minted NFT with Token ID:', result.events.PuzzlePieceCreated.returnValues.tokenId);
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}

export async function mint_artwork() {


}

export async function POST(req) {
    try {
        const { message } = await req.json();
        console.log(message);
        return NextResponse.json("Success");
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json("Failed");
    }
}
