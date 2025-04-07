import React from "react";

const GameOverScreen = ({ score, highScore, onRestart }) => {
  return (
    <div className="text-center p-8 bg-white rounded shadow-md relative w-[320px]">
      <h2 className="text-2xl font-bold mb-4">You scored : {score}</h2>
      <button
        onClick={onRestart}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full mb-4"
      >
        Restart
      </button>
      <div className="bg-green-600 text-white px-4 py-2 rounded-full">
        Highest score: {highScore}
      </div>
    </div>
  );
};

export default GameOverScreen;
