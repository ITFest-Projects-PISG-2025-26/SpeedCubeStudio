// apps/frontend/src/components/stats/HomeStats.tsx
import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { useSolveStore } from "../../lib/store";

const HomeStats: React.FC = () => {
  const { solves, statistics, statConfig, calculateStatistics } = useSolveStore();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    calculateStatistics();
  }, [solves, calculateStatistics]);

  if (statistics.count === 0) {
    return null; // Don't show anything if no solves yet
  }

  const getVisibleStats = () => {
    const stats = [];
    
    if (statConfig.showBest && statistics.best !== null) {
      stats.push({
        key: 'best',
        label: 'Best',
        value: statistics.best,
        color: 'success' as const,
      });
    }
    
    if (statConfig.showAo5 && statistics.ao5 !== null) {
      stats.push({
        key: 'ao5',
        label: 'Ao5',
        value: statistics.ao5,
        target: statConfig.showTarget ? statConfig.targetTime : undefined,
      });
    }
    
    if (statConfig.showAo12 && statistics.ao12 !== null) {
      stats.push({
        key: 'ao12',
        label: 'Ao12',
        value: statistics.ao12,
      });
    }
    
    if (statConfig.showMean && statistics.mean !== null) {
      stats.push({
        key: 'mean',
        label: 'Mean',
        value: statistics.mean,
        subtitle: `of ${statistics.count} solves`,
      });
    }

    return stats.slice(0, 4); // Show max 4 stats on homepage
  };

  const visibleStats = getVisibleStats();

  if (visibleStats.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Stats ({statistics.count} solves)
        </h3>
        <button
          onClick={() => setShowStats(!showStats)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          <svg 
            className={`w-4 h-4 transition-transform ${showStats ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showStats ? 'Hide' : 'Show'} Stats
        </button>
      </div>
      
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          {visibleStats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color}
              target={stat.target}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeStats;
