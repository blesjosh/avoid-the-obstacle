import React from "react";

const StartScreen = ({ onStart, highScore }) => {
  return (
    <div className="text-center p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-extrabold mb-6">AVOID THE OBSTACLES</h1>
      <button
        onClick={onStart}
        className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-3 rounded-full mb-4"
      >
        START
      </button>
      <div className="bg-green-600 text-white px-4 py-2 rounded-full">
        Highest score: {highScore}
      </div>
    </div>
  );
};

export default StartScreen;
