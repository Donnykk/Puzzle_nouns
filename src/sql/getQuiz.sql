CREATE DATABASE Quiz;

use Quiz;

CREATE TABLE QuizList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Question VARCHAR(256) NOT NULL,
    ChoiceA VARCHAR(256),
    ChoiceB VARCHAR(256),
    ChoiceC VARCHAR(256),
    Answer VARCHAR(256) NOT NULL
);

INSERT INTO
    QuizList (
        Question,
        ChoiceA,
        ChoiceB,
        ChoiceC,
        Answer
    )
VALUES (
        'What is the underlying technology behind Bitcoin?',
        'Proof of Stake',
        'Blockchain',
        'Hashing',
        'B'
    ),
    (
        'Which consensus mechanism does Bitcoin use?',
        'Proof of Authority',
        'Proof of Work',
        'Proof of Stake',
        'B'
    ),
    (
        'What does a blockchain primarily store?',
        'Images',
        'Transactions',
        'Documents',
        'B'
    ),
    (
        'What is the purpose of a smart contract?',
        'To store value',
        'To automate agreements',
        'To mine cryptocurrency',
        'B'
    ),
    (
        'What is Ethereum primarily known for?',
        'Storing tokens',
        'Smart contracts and dApps',
        'Governance voting',
        'B'
    ),
    (
        'Which term describes the maximum supply of Bitcoin?',
        'Unlimited',
        '21 million',
        '50 million',
        'B'
    ),
    (
        'Which blockchain feature makes it secure?',
        'Central authority',
        'Immutability',
        'Open access',
        'B'
    ),
    (
        'What is a decentralized application (dApp)?',
        'A private server app',
        'An app running on a blockchain',
        'A cloud-based app',
        'B'
    ),
    (
        'What does DeFi stand for?',
        'Distributed Finance',
        'Decentralized Finance',
        'Digital Finance',
        'B'
    ),
    (
        'What is the primary function of miners in Bitcoin?',
        'To govern the network',
        'To validate and secure transactions',
        'To create smart contracts',
        'B'
    ),
    (
        'What is a private key used for?',
        'To sign a smart contract',
        'To access and control cryptocurrency',
        'To encrypt messages',
        'B'
    ),
    (
        'What does the term gas refer to in Ethereum?',
        'Blockchain fuel',
        'Transaction fees',
        'Smart contract code',
        'B'
    ),
    (
        'What is the purpose of a blockchain node?',
        'To mine new blocks',
        'To validate and relay transactions',
        'To store tokens',
        'B'
    ),
    (
        'What is the primary benefit of decentralization?',
        'Increased central authority',
        'No single point of failure',
        'Faster transactions',
        'B'
    ),
    (
        'Which algorithm is used in Ethereum 2.0?',
        'Proof of Work',
        'Proof of Stake',
        'Proof of Capacity',
        'B'
    ),
    (
        'What does a hash function in blockchain do?',
        'Creates new tokens',
        'Transforms data into fixed-length outputs',
        'Encrypts data',
        'B'
    ),
    (
        'Which cryptocurrency is known as "digital gold"?',
        'Ethereum',
        'Bitcoin',
        'Litecoin',
        'B'
    ),
    (
        'What does the term "fork" refer to in blockchain?',
        'A hardware tool',
        'A split in the blockchain',
        'A type of mining pool',
        'B'
    ),
    (
        'Which blockchain is known for privacy features?',
        'Ethereum',
        'Monero',
        'Bitcoin',
        'B'
    ),
    (
        'What does the term "HODL" mean in the crypto community?',
        'Sell immediately',
        'Hold onto your crypto',
        'Mine new coins',
        'B'
    ),
    (
        'What is a stablecoin?',
        'A highly volatile cryptocurrency',
        'A cryptocurrency pegged to a stable asset',
        'A governance token',
        'B'
    ),
    (
        'What does an Initial Coin Offering (ICO) allow?',
        'To govern a network',
        'To raise funds by issuing tokens',
        'To mint NFTs',
        'B'
    ),
    (
        'What is the difference between a hot wallet and a cold wallet?',
        'Cold wallets are faster',
        'Cold wallets are offline',
        'Hot wallets are safer',
        'B'
    ),
    (
        'What is staking in a blockchain network?',
        'Lending cryptocurrency',
        'Locking up funds to support network security',
        'Mining new coins',
        'B'
    ),
    (
        'Which blockchain platform introduced NFTs?',
        'Bitcoin',
        'Ethereum',
        'Monero',
        'B'
    ),
    (
        'What is the total supply limit of Ether (ETH)?',
        '10 million',
        'No fixed supply limit',
        '100 million',
        'B'
    ),
    (
        'What is a token burn?',
        'Minting new tokens',
        'Permanently removing tokens from circulation',
        'Rewarding miners',
        'B'
    ),
    (
        'What is a DAO (Decentralized Autonomous Organization)?',
        'A private organization',
        'An organization governed by smart contracts',
        'A centralized company',
        'B'
    ),
    (
        'What is the primary advantage of using a blockchain?',
        'Centralized control',
        'Transparency and security',
        'Higher costs',
        'B'
    ),
    (
        'Which of the following is a consensus algorithm?',
        'SHA-256',
        'Proof of Work',
        'AES',
        'B'
    ),
    (
        'What is a non-fungible token (NFT)?',
        'A token that can be exchanged like money',
        'A unique digital asset',
        'A mining reward',
        'B'
    );