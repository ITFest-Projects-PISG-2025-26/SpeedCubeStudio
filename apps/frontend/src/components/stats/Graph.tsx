// apps/frontend/src/components/stats/Graph.tsx
import React from "react";

interface GraphProps {
  data: { time: number; index: number }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
      <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Solve Times</h3>
      <div className="flex items-center justify-center h-48 text-gray-500">
        <p>Chart visualization coming soon</p>
        <p className="text-xs ml-2">({data.length} data points)</p>
      </div>
    </div>
  );
};

export default Graph;
