"use client";

import React, { useRef, useState, useEffect } from "react";
import { Palette, RefreshCw, Trophy } from "lucide-react";

const ColorPuzzle = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [shapesColored, setShapesColored] = useState(new Set());

  const colors = [
    { value: "#FF0000", name: "Улаан" },
    { value: "#00FF00", name: "Ногоон" },
    { value: "#0000FF", name: "Хөх" },
    { value: "#FFFF00", name: "Шар" },
    { value: "#FFA500", name: "Улбар шар" },
  ];

  const shapes = [
    { name: "Дугуй", type: "circle", params: [80, 100, 40] },
    { name: "Дөрвөлжин", type: "rectangle", params: [160, 80, 80, 80] },
    {
      name: "Гурвалжин",
      type: "triangle",
      params: [300, 150, 260, 80, 340, 80],
    },
  ];

  const drawShapes = (ctx, clear = false) => {
    if (clear) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    shapes.forEach((shape) => {
      ctx.beginPath();
      if (shape.type === "circle") {
        ctx.arc(
          shape.params[0],
          shape.params[1],
          shape.params[2],
          0,
          Math.PI * 2
        );
      } else if (shape.type === "rectangle") {
        ctx.rect(...shape.params);
      } else if (shape.type === "triangle") {
        ctx.moveTo(shape.params[0], shape.params[1]);
        ctx.lineTo(shape.params[2], shape.params[3]);
        ctx.lineTo(shape.params[4], shape.params[5]);
      }
      ctx.closePath();
      ctx.strokeStyle = "#2c3e50";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const isPointInShape = (ctx, x, y, shape) => {
    ctx.beginPath();
    if (shape.type === "circle") {
      ctx.arc(...shape.params, 0, Math.PI * 2);
    } else if (shape.type === "rectangle") {
      ctx.rect(...shape.params);
    } else if (shape.type === "triangle") {
      ctx.moveTo(shape.params[0], shape.params[1]);
      ctx.lineTo(shape.params[2], shape.params[3]);
      ctx.lineTo(shape.params[4], shape.params[5]);
    }
    ctx.closePath();
    return ctx.isPointInPath(x, y);
  };

  const fillShape = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let shapeFound = false;
    shapes.forEach((shape, index) => {
      if (isPointInShape(ctx, x, y, shape)) {
        if (!shapesColored.has(index)) {
          ctx.fillStyle = selectedColor;
          ctx.fill();
          setScore((prev) => prev + 10);
          setMessage(`Баяр хүргэе! ${shape.name}-г зөв будлаа!`);
          setShapesColored((prev) => new Set(prev.add(index)));
          shapeFound = true;
        } else {
          setMessage("Энэ дүрсийг аль хэдийн будсан байна!");
        }
      }
    });

    if (!shapeFound) {
      setMessage("Өө, буруу будлаа. Дахин оролдоорой!");
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    fillShape(x, y);
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawShapes(ctx, true);
    setScore(0);
    setMessage("");
    setShapesColored(new Set());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawShapes(ctx);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Дүрс ба өнгө таавар
          </h1>
          <p className="text-gray-600">Дүрсүүдийг өнгөөр будна уу</p>
        </div>

        <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            <span className="text-lg font-semibold">Оноо: {score}</span>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Дахин эхлэх
          </button>
        </div>

        {message && (
          <div
            className={`text-center p-3 rounded-lg mb-4 ${
              message.includes("Баяр")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            onClick={handleCanvasClick}
            className="border-2 border-gray-200 rounded-xl cursor-pointer bg-white"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette className="text-gray-500" />
            <span className="font-medium text-gray-700">Өнгө сонгох:</span>
          </div>
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                style={{ backgroundColor: color.value }}
                className={`w-12 h-12 rounded-full shadow-md transition-transform hover:scale-110 ${
                  selectedColor === color.value ? "ring-4 ring-blue-300" : ""
                }`}
                onClick={() => setSelectedColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {shapesColored.size === shapes.length && (
          <div className="mt-6 text-center p-4 bg-green-100 text-green-700 rounded-lg">
            Баяр хүргэе! Та бүх дүрсийг будаж дууслаа! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPuzzle;
