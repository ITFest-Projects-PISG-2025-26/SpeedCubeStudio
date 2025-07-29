// apps/frontend/src/components/trainer/TrainerFilters.tsx
import React from "react";

interface TrainerFiltersProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
}

const groups = ["OLL", "PLL", "F2L"];

const TrainerFilters: React.FC<TrainerFiltersProps> = ({ selectedGroup, onSelectGroup }) => {
  return (
    <div className="flex gap-3 justify-center my-4">
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => onSelectGroup(group)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedGroup === group
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  );
};

export default TrainerFilters;
