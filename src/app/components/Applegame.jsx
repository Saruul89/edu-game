"use client";
import React, { useState, useEffect } from "react";
import { Heart, RefreshCcw, Star } from "lucide-react";

const AppleGame = () => {
  const [apples, setApples] = useState(5);
  const [collected, setCollected] = useState(0);
  const [message, setMessage] = useState("");
  const [showStars, setShowStars] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const resetGame = () => {
    setCollected(0);
    setMessage("");
    setShowStars(false);
    setApples(Math.min(3 + level * 2, 12)); // Increase apples with level, max 12
  };

  const collectApple = (index) => {
    if (collected < apples) {
      setCollected((prev) => prev + 1);
      // Play cute sound effect (browser API)
      const audio = new Audio("/pop.mp3");
      audio.play().catch(() => {}); // Ignore if audio fails to play
    }
  };

  const checkAnswer = () => {
    if (collected === apples) {
      setMessage("✨ Баяр хүргэе! Маш сайн! 🎉");
      setShowStars(true);
      setScore(score + level * 10);
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        resetGame();
      }, 2000);
    } else {
      setMessage("💫 Дахин оролдоорой! Чи чадна! 💫");
    }
  };

  useEffect(() => {
    resetGame();
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <div className="p-8 rounded-2xl backdrop-blur-sm bg-white/30 shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Heart className="text-red-500" />
            <span className="text-xl font-bold text-gray-800">
              Түвшин: {level}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">
              Оноо: {score}
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-bounce">
          🌳 Алимны Тоглоом 🍎
        </h1>

        <p className="text-xl text-center text-gray-700 mb-6">
          Модон дээр <span className="font-bold text-red-500">{apples}</span>{" "}
          ширхэг алим байна
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {[...Array(apples)].map((_, index) => (
            <div
              key={index}
              onClick={() => collectApple(index)}
              className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer 
                rounded-full border-4 transition-all duration-300 transform hover:scale-110
                ${
                  collected > index
                    ? "opacity-50 border-gray-300 rotate-12"
                    : "border-red-400 hover:border-red-500 animate-pulse"
                }`}
            >
              🍎
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Цуглуулсан алим: {collected}
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={checkAnswer}
              className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 
                text-white font-bold rounded-full shadow-lg hover:shadow-xl 
                transform transition hover:-translate-y-1 active:translate-y-0"
            >
              Хариуг шалгах
            </button>

            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-purple-400 to-purple-500 
                text-white font-bold rounded-full shadow-lg hover:shadow-xl 
                transform transition hover:-translate-y-1 active:translate-y-0
                flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Дахин эхлэх
            </button>
          </div>

          {message && (
            <p
              className={`mt-6 text-xl font-bold animate-bounce
              ${
                message.includes("Баяр") ? "text-green-600" : "text-purple-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {showStars && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `ping ${
                    1 + Math.random() * 2
                  }s cubic-bezier(0, 0, 0.2, 1) infinite`,
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleGame;
