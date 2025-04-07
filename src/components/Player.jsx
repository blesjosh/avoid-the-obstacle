import React from "react";

const Player = ({ x }) => {
  return (
    <div
      className="absolute bottom-4 transition-all duration-100"
      style={{ left: `${x}px` }}
    >
      <img src="https://i.imgur.com/N9v4rYh.png" alt="player" className="w-10" />
    </div>
  );
};

export default Player;
