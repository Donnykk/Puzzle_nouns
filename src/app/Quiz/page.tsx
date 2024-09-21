"use client";
import React, { useState, useEffect } from "react";
import Header from "../PuzzleNoun/Header";
import Footer from "../PuzzleNoun/Footer";
import Link from "next/link";

const PuzzleNouns: React.FC = () => {
    const [Question, setQuestion] = useState("");
    const [ChoiceA, setChoiceA] = useState("");
    const [ChoiceB, setChoiceB] = useState("");
    const [ChoiceC, setChoiceC] = useState("");
    const [Answer, setAnswer] = useState("");
    const [Index, setIndex] = useState<number>(1);
    const [showLink, setShowLink] = useState<boolean>(false);


    const fetchQuizData = async () => {
        try {
            const response = await fetch('/api/getQuiz');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.length > 0) {
                console.log("Index" + Index);
                setQuestion(data[Index - 1].Question);
                setChoiceA(data[Index - 1].ChoiceA);
                setChoiceB(data[Index - 1].ChoiceB);
                setChoiceC(data[Index - 1].ChoiceC);
                setAnswer(data[Index - 1].Answer);
            }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    const handleButtonClick = async (choice: string) => {
        console.log(`Button ${choice} was clicked!`);
        if (choice === Answer) {
            if (Index % 5 == 0) {
                // add a piece

                alert("Congradulations! You have earned a puzzle piece!");
                setShowLink(true);
            }
            else {

                setIndex(prevIndex => prevIndex + 1);
            }
        } else {
            alert("Wrong answer. Try again!");
        }
    }

    useEffect(() => {
        fetchQuizData();
    }, [Index]);

    useEffect(() => {
        fetchQuizData();
    }, []);

    return (
        <div className="flex flex-col bg-gray-100">
            <Header />
            <main className="flex flex-col items-center mt-10 px-40 py-10 bg-white shadow-md rounded-lg mx-auto max-w-full">
                <h1 className="text-3xl font-bold text-black mb-5">
                    Blockchain Quiz
                </h1>
                {showLink && (
                    <Link href="/PuzzlePieces" className="mt-5 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                        View your pieces
                    </Link>
                )}
                <div className="mt-5 mb-5 text-xl text-center font-medium">
                    {Index}. {Question}
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <button
                        type="button"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        onClick={() => handleButtonClick('A')}
                    >
                        A. {ChoiceA}
                    </button>
                    <button
                        type="button"
                        className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                        onClick={() => handleButtonClick('B')}
                    >
                        B. {ChoiceB}
                    </button>
                    <button
                        type="button"
                        className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                        onClick={() => handleButtonClick('C')}
                    >
                        C. {ChoiceC}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PuzzleNouns;
