// pages/api/nfts.js

export default function handler(req, res) {
  res.status(200).json({
    nfts: [
      {
        image: '/nft1.png',
        title: 'AI Noun 1',
      },
      {
        image: '/nft2.png',
        title: 'AI Noun 2',
      },
      {
        image: '/nft3.png',
        title: 'AI Noun 3',
      },
      {
        image: '/nft4.png',
        title: 'AI Noun 4',
      },
    ],
  });
}
