// apps/frontend/src/components/stats/Graph.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface GraphProps {
  data: { time: number; index: number }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
      <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Solve Times</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="index" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="time" stroke="#2563eb" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
