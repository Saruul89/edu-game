"use client";
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Star, RefreshCw, CheckCircle } from "lucide-react";

const DraggableLetter = ({ letter, index, moveLetter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "letter",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        w-16 h-16
        flex items-center justify-center
        text-2xl font-bold
        bg-gradient-to-r from-pink-200 to-purple-200
        border-4 border-purple-300
        rounded-xl
        cursor-move
        shadow-lg
        transform transition-all duration-300
        hover:scale-110 hover:shadow-xl
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      {letter}
    </div>
  );
};

const DropZone = ({ letter, index, acceptLetter }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "letter",
    drop: (item) => acceptLetter(item.index, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`
        w-16 h-16
        flex items-center justify-center
        text-2xl font-bold
        border-4 border-dashed
        rounded-xl
        transition-all duration-300
        ${
          isOver
            ? "bg-blue-100 border-blue-400 scale-110"
            : "bg-gray-50 border-gray-300"
        }
        ${letter ? "border-solid border-green-300 bg-green-50" : ""}
      `}
    >
      {letter}
    </div>
  );
};

const WordPuzzle = () => {
  const [letters, setLetters] = useState(["А", "И", "М", "Л"]);
  const [target, setTarget] = useState([null, null, null, null]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const correctOrder = ["А", "Л", "И", "М"];

  const acceptLetter = (dragIndex, dropIndex) => {
    const draggedLetter = letters[dragIndex];
    const newTarget = [...target];

    // If there's already a letter in the target spot, swap it back to letters
    if (newTarget[dropIndex] !== null) {
      const previousLetter = newTarget[dropIndex];
      setLetters((prev) => [...prev, previousLetter]);
    }

    newTarget[dropIndex] = draggedLetter;
    setTarget(newTarget);

    const newLetters = letters.filter((_, idx) => idx !== dragIndex);
    setLetters(newLetters);

    // Play a cute sound effect
    const audio = new Audio("/pop.mp3");
    audio.play().catch(() => {});
  };

  const resetGame = () => {
    setLetters(["А", "И", "М", "Л"]);
    setTarget([null, null, null, null]);
    setShowCelebration(false);
  };

  const checkResult = () => {
    setAttempts((prev) => prev + 1);
    if (JSON.stringify(target) === JSON.stringify(correctOrder)) {
      setScore((prev) => prev + 100);
      setShowCelebration(true);
      // Play success sound
      const audio = new Audio("/success.mp3");
      audio.play().catch(() => {});
    } else {
      // Play error sound
      const audio = new Audio("/error.mp3");
      audio.play().catch(() => {});
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span className="text-xl font-bold text-gray-800">Оноо: {score}</span>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 animate-bounce">
            ✨ Үсэг таавар ✨
          </h1>

          <p className="text-lg text-center text-gray-600 mb-6">
            "Алим" гэдэг үг бүтээгээрэй!
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {target.map((letter, index) => (
              <DropZone
                key={index}
                letter={letter}
                index={index}
                acceptLetter={acceptLetter}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {letters.map((letter, index) => (
              <DraggableLetter
                key={index}
                letter={letter}
                index={index}
                moveLetter={acceptLetter}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={checkResult}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 
                text-white font-bold rounded-full shadow-lg hover:shadow-xl 
                transform transition hover:-translate-y-1 active:translate-y-0
                flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Хариуг шалгах
            </button>

            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 
                text-white font-bold rounded-full shadow-lg hover:shadow-xl 
                transform transition hover:-translate-y-1 active:translate-y-0
                flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Дахин эхлэх
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Оролдлогын тоо: {attempts}
          </p>
        </div>

        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none">
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
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              text-4xl font-bold text-green-600 animate-bounce"
            >
              🎉 Баяр хүргэе! 🎉
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default WordPuzzle;
