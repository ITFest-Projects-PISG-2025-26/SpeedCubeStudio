// apps/frontend/src/components/solver/MoveBreakdown.tsx
import React from "react";

interface MoveBreakdownProps {
  moves: string[];
}

const MoveBreakdown: React.FC<MoveBreakdownProps> = ({ moves }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Move Breakdown</h3>
      <div className="flex flex-wrap gap-2">
        {moves.map((move, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded text-sm"
          >
            {move}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MoveBreakdown;
