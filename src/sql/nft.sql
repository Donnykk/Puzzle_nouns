-- SQLBook: Code
CREATE DATABASE Pictures;

USE Pictures;

CREATE TABLE PicturesList (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    characteristic VARCHAR(256) NOT NULL,
    url VARCHAR(256) NOT NULL,
    metadata VARCHAR(256)
);