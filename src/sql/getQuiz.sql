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
        'What is a key feature of blockchain?',
        'Decentralization',
        'Centralization',
        'High latency',
        'A'
    ),
    (
        'Who is the creator of Bitcoin?',
        'Vitalik Buterin',
        'Satoshi Nakamoto',
        'Gavin Wood',
        'B'
    ),
    (
        'Which consensus algorithm is widely used in Bitcoin?',
        'Proof of Stake (PoS)',
        'Proof of Work (PoW)',
        'Delegated Proof of Stake (DPoS)',
        'B'
    ),
    (
        'What does Ethereum primarily enable?',
        'Smart Contracts',
        'Payments only',
        'Centralized databases',
        'A'
    ),
    (
        'What do miners in blockchain primarily do?',
        'Dig for physical gold',
        'Verify transactions',
        'Generate private keys',
        'B'
    ),
    (
        'What is the commonly used token standard on Ethereum?',
        'ERC-20',
        'BEP-20',
        'TRC-20',
        'A'
    ),
    (
        'In blockchain, what is a node?',
        'A computer that processes transactions',
        'A database server',
        'A web client',
        'A'
    ),
    (
        'What is a "hash" in blockchain?',
        'A unique identifier',
        'A random number generator',
        'A type of cryptography',
        'A'
    ),
    (
        'Which cryptographic method is widely used in blockchain for securing transactions?',
        'Symmetric encryption',
        'Asymmetric encryption',
        'Hashing',
        'B'
    ),
    (
        'What is a smart contract?',
        'A self-executing code on the blockchain',
        'A legal agreement',
        'A document stored on the blockchain',
        'A'
    );