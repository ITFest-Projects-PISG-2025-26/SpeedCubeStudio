import React from "react";
import { getSolves } from "../utils/storage";
import { calculateAverages } from "../utils/stats";

const Stats: React.FC = () => {
  const stats = calculateAverages(getSolves());

  return (
    <div className="text-left">
      <h2 className="text-2xl mb-2">Stats</h2>
      <p>Best: {stats.best.toFixed(2)}s</p>
      <p>Worst: {stats.worst.toFixed(2)}s</p>
      <p>Ao5: {stats.ao5}</p>
      <p>Ao12: {stats.ao12}</p>
      <p>Ao50: {stats.ao50}</p>
      <p>Ao100: {stats.ao100}</p>
    </div>
  );
};

export default Stats;
