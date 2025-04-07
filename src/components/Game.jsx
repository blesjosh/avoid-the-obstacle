import React, { useEffect, useState } from 'react';
import Obstacle from './Obstacle';

const Game = () => {
  const [playerX, setPlayerX] = useState(130);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameWidth = 300;
  const gameHeight = 400;
  const playerSize = 40;
  const obstacleSize = 40;
  const moveStep = 20;

  // Arrow Key Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlayerX((prev) => Math.max(prev - moveStep, 0));
      } else if (e.key === 'ArrowRight') {
        setPlayerX((prev) => Math.min(prev + moveStep, gameWidth - playerSize));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((ob) => ({ ...ob, y: ob.y + 5 }))
          .filter((ob) => ob.y < gameHeight)
      );

      // Random obstacle
      if (Math.random() < 0.05) {
        const x = Math.floor(Math.random() * (gameWidth - obstacleSize));
        const colors = ['bg-red-500', 'bg-blue-500'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        setObstacles((prev) => [...prev, { x, y: 0, color }]);
      }

      setScore((s) => s + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Collision Detection
  useEffect(() => {
    for (let ob of obstacles) {
      const isCollision =
        ob.y + obstacleSize >= gameHeight - playerSize - 10 &&
        ob.x < playerX + playerSize &&
        ob.x + obstacleSize > playerX;

      if (isCollision) {
        setGameOver(true);
        break;
      }
    }
  }, [obstacles, playerX]);

  const handleRestart = () => {
    setObstacles([]);
    setPlayerX(130);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div
      className="relative bg-white border border-black overflow-hidden rounded shadow-lg"
      style={{ width: gameWidth, height: gameHeight }}
    >
      {/* Player */}
      <div
        className="absolute rounded-md bg-green-600 border-2 border-black"
        style={{
          width: playerSize,
          height: playerSize,
          bottom: 10,
          left: playerX,
        }}
      ></div>

      {/* Obstacles */}
      {obstacles.map((obs, index) => (
        <Obstacle key={index} x={obs.x} y={obs.y} color={obs.color} />
      ))}

      {/* Score */}
      <div className="absolute top-2 left-2 text-black font-bold text-sm">
        Score: {score}
      </div>

      {/* Arrow Key Hint */}
      {!gameOver && (
        <div className="absolute top-2 right-2 text-xs bg-yellow-300 px-2 py-1 rounded font-semibold text-black">
          Use ⬅️ ➡️ keys
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white font-bold">
          <p className="text-xl mb-4">You scored: {score}</p>
          <button
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
