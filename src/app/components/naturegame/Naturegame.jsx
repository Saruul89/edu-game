"use client";

import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Trophy, RefreshCw, Trash2 } from "lucide-react";
import { trashItems } from "./TrashItems";
import { DraggableTrash } from "./DraggableTrash";
import { TrashBin } from "./Trashbin";

const EcoGame = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    timeLeft: 60,
    isGameActive: true,
    correctItems: { шил: 0, хуванцар: 0, цаас: 0 },
  });

  useEffect(() => {
    if (gameState.isGameActive && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          isGameActive: prev.timeLeft > 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.isGameActive]);

  const handleDrop = (item) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 10,
      correctItems: {
        ...prev.correctItems,
        [item.type]: prev.correctItems[item.type] + 1,
      },
    }));
  };

  const resetGame = () => {
    setGameState({
      score: 0,
      timeLeft: 60,
      isGameActive: true,
      correctItems: { шил: 0, хуванцар: 0, цаас: 0 },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Байгаль хамгаалагч
            </h1>
            <p className="text-gray-600">Хогийг зөв хогийн саванд хийнэ үү</p>
          </div>

          <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">
                Оноо: {gameState.score}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Үлдсэн хугацаа: {gameState.timeLeft}с
              </span>
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Дахин эхлэх
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 place-items-center mb-8">
            {trashItems.map((item, index) => (
              <DraggableTrash
                key={index}
                type={item.type}
                image={item.image}
                index={index}
                isDisabled={!gameState.isGameActive}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {["шил", "хуванцар", "цаас"].map((type) => (
              <TrashBin
                key={type}
                acceptedType={type}
                onDrop={handleDrop}
                totalItems={
                  trashItems.filter((item) => item.type === type).length
                }
                correctItems={gameState.correctItems[type]}
              />
            ))}
          </div>

          {!gameState.isGameActive && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Тоглоом дууслаа!
              </h2>
              <p className="text-lg text-gray-600">
                Таны оноо: {gameState.score}
              </p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default EcoGame;
