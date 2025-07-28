import React, { useState } from "react";
import { getSolves, saveSolves } from "../utils/storage";

const SolveHistory: React.FC = () => {
  const [solves, setSolves] = useState(getSolves());

  const deleteSolve = (index: number) => {
    const updated = solves.filter((_, i) => i !== index);
    setSolves(updated);
    saveSolves(updated);
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">Solve History</h2>
      <ul>
        {solves.map((time, idx) => (
          <li key={idx} className="flex justify-between w-64">
            {time.toFixed(2)}s
            <button
              onClick={() => deleteSolve(idx)}
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolveHistory;
