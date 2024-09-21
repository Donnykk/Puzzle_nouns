## What to do next

### Integrate smart contract

- When NFT and pieces generated, upload metadata to IPFS (optional?)(src/app/api/build/route.js)
    Pieces are now stored local(arc/app/img and named by piece_originId_row_col)

- When user finish a quiz or share to social media, mint a piece randomly (implement in src/app/api/mint/route.js and will be called in src/app/Quiz/page.tsx)

- When user collect 9 pieces of a set, mint the origin NFT

- When user collect total 27 pieces, form an artwork and mint((implement in src/app/api/mint/route.js and will be called in src/app/FormArtWork/page.tsx))

- Use NLP to generate NFT