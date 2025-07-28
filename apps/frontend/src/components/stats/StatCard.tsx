// apps/frontend/src/components/stats/StatCard.tsx
import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 text-center w-32">
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{label}</h3>
      <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};

export default StatCard;
