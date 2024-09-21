// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NounsPuzzleNFT is ERC721, Ownable {
    uint256 private _tokenIds;

    struct PuzzlePiece {
        uint256 tokenId;
        bool isQuestion; // Indicates if the piece is a question or artwork
        bool isSolved; // Indicates if a blockchain question is solved
        string metadata; // The metadata for the puzzle piece
    }

    // Mapping from tokenId to puzzle piece
    mapping(uint256 => PuzzlePiece) public puzzlePieces;

    // Mapping from user to collected puzzle pieces
    mapping(address => uint256[]) public userPuzzlePieces;

    // Events
    event PuzzlePieceCreated(uint256 tokenId, address owner, bool isQuestion);
    event PuzzleCompleted(address user, string artworkUri);

    constructor() ERC721("NounsPuzzleNFT", "NPZ") {}

    // Function to create a new puzzle piece
    function createPuzzlePiece(address recipient, bool isQuestion, string memory metadata) public onlyOwner returns (uint256) {
        _tokenIds += 1;  // Increment the token ID manually
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        puzzlePieces[newItemId] = PuzzlePiece({
            tokenId: newItemId,
            isQuestion: isQuestion,
            isSolved: !isQuestion, // If it's not a question, mark as solved by default
            metadata: metadata
        });
        
        userPuzzlePieces[recipient].push(newItemId);

        emit PuzzlePieceCreated(newItemId, recipient, isQuestion);

        return newItemId;
    }

    // Function to solve a question piece (blockchain questions)
    function solveQuestion(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "You do not own this puzzle piece");
        require(puzzlePieces[tokenId].isQuestion == true, "This is not a question piece");
        require(puzzlePieces[tokenId].isSolved == false, "Question already solved");

        // AI or off-chain process to check the question's answer

        // Mark question as solved
        puzzlePieces[tokenId].isSolved = true;
    }

    // Function to check if the user has completed the puzzle
    function checkPuzzleCompletion(address user) public view returns (bool) {
        uint256[] memory pieces = userPuzzlePieces[user];
        uint256 solvedCount = 0;

        // The puzzle is considered complete when the user has 27 pieces and all questions are solved
        for (uint256 i = 0; i < pieces.length; i++) {
            if (puzzlePieces[pieces[i]].isSolved) {
                solvedCount++;
            }
        }

        return solvedCount == 27;
    }

    // Function to mint artwork after puzzle completion
    function mintArtwork(address user, string memory artworkUri) public onlyOwner {
        require(checkPuzzleCompletion(user), "Puzzle is not yet completed");

        // Mint a new NFT representing the completed artwork
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);

        // Set artwork metadata
        puzzlePieces[newItemId] = PuzzlePiece({
            tokenId: newItemId,
            isQuestion: false,
            isSolved: true,
            metadata: artworkUri
        });

        // Emit event for sharing the artwork on platforms like Twitter
        emit PuzzleCompleted(user, artworkUri);
    }

    // Function to get user's puzzle progress
    function getUserPuzzleProgress(address user) public view returns (uint256 totalPieces, uint256 solvedPieces) {
        uint256[] memory pieces = userPuzzlePieces[user];
        uint256 solvedCount = 0;

        for (uint256 i = 0; i < pieces.length; i++) {
            if (puzzlePieces[pieces[i]].isSolved) {
                solvedCount++;
            }
        }

        return (pieces.length, solvedCount);
    }
}