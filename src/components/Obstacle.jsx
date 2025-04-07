import React from 'react';

const Obstacle = ({ x, y, color }) => {
  return (
    <div
      className={`absolute w-10 h-10 rounded ${color}`}
      style={{ top: `${y}px`, left: `${x}px` }}
    />
  );
};

export default Obstacle;
