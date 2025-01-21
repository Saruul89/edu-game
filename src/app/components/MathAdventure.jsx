"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Timer, RefreshCw } from "lucide-react";

const MathAdventure = () => {
  // Initialize state with null/empty values
  const [gameState, setGameState] = useState({
    num1: null,
    num2: null,
    operator: "+",
    answer: "",
    message: "",
    score: 0,
    streak: 0,
    timeLeft: 30,
    isGameActive: true,
  });

  // Initialize game on mount only
  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      num1: generateRandomNumber(),
      num2: generateRandomNumber(),
    }));
  }, []);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  useEffect(() => {
    let timer;
    if (gameState.isGameActive && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
          isGameActive: prevState.timeLeft > 1,
        }));
      }, 1000);
    } else if (gameState.timeLeft === 0) {
      setGameState((prevState) => ({
        ...prevState,
        isGameActive: false,
        message: "Тоглоом дууслаа!",
      }));
    }
    return () => clearInterval(timer);
  }, [gameState.timeLeft, gameState.isGameActive]);

  const generateNewQuestion = () => {
    const newNum1 = generateRandomNumber();
    const newNum2 = generateRandomNumber();
    const newOperator = Math.random() > 0.5 ? "+" : "-";

    setGameState((prevState) => ({
      ...prevState,
      num1: newOperator === "-" && newNum1 < newNum2 ? newNum2 : newNum1,
      num2: newOperator === "-" && newNum1 < newNum2 ? newNum1 : newNum2,
      operator: newOperator,
      answer: "",
      message: "",
    }));
  };

  const resetGame = () => {
    setGameState({
      num1: generateRandomNumber(),
      num2: generateRandomNumber(),
      operator: "+",
      answer: "",
      message: "",
      score: 0,
      streak: 0,
      timeLeft: 30,
      isGameActive: true,
    });
  };

  const checkAnswer = () => {
    if (!gameState.isGameActive) return;

    const correctAnswer =
      gameState.operator === "+"
        ? gameState.num1 + gameState.num2
        : gameState.num1 - gameState.num2;
    const userAnswer = parseInt(gameState.answer);

    if (userAnswer === correctAnswer) {
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 10,
        streak: prevState.streak + 1,
        message: "Баяр хүргэе! Зөв хариу!",
      }));
      generateNewQuestion();
    } else {
      setGameState((prevState) => ({
        ...prevState,
        streak: 0,
        message: `Өө, буруу байна. Зөв хариу: ${correctAnswer}`,
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  // Don't render until initial state is set
  if (gameState.num1 === null || gameState.num2 === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Математикийн адал явдал
        </h1>

        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-2" />
            <span className="text-lg font-semibold">
              Оноо: {gameState.score}
            </span>
          </div>
          <div className="flex items-center">
            <Timer className="text-blue-500 mr-2" />
            <span className="text-lg font-semibold">
              Хугацаа: {gameState.timeLeft}с
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <p className="text-3xl text-center font-bold text-gray-700">
            {gameState.num1} {gameState.operator} {gameState.num2} = ?
          </p>
        </div>

        <input
          type="number"
          value={gameState.answer}
          onChange={(e) =>
            setGameState((prev) => ({ ...prev, answer: e.target.value }))
          }
          onKeyPress={handleKeyPress}
          placeholder="Хариу бичнэ үү"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!gameState.isGameActive}
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={checkAnswer}
            disabled={!gameState.isGameActive}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Шалгах
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Шинээр эхлэх
          </button>
        </div>

        {gameState.message && (
          <p
            className={`mt-6 text-lg font-semibold text-center ${
              gameState.message.includes("Зөв")
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {gameState.message}
          </p>
        )}

        {gameState.streak >= 3 && (
          <div className="mt-4 text-center text-orange-500 font-bold">
            🔥 {gameState.streak} удаа дараалан зөв!
          </div>
        )}
      </div>
    </div>
  );
};

export default MathAdventure;
