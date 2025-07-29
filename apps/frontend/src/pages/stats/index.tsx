import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import StatCard from "../../components/stats/StatCard";
import Graph from "../../components/stats/Graph";
import StatsConfig from "../../components/stats/StatsConfig";
import { useSolveStore } from "../../lib/store";

export default function StatsPage() {
  const { solves, statistics, statConfig, clearSolves, calculateStatistics } = useSolveStore();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Recalculate statistics on component mount and when solves change
  useEffect(() => {
    calculateStatistics();
  }, [solves, calculateStatistics]);

  const handleClearSolves = () => {
    clearSolves();
    setShowConfirmClear(false);
  };

  const getStatCards = () => {
    const cards = [];
    
    if (statConfig.showBest && statistics.best !== null) {
      cards.push({
        key: 'best',
        label: 'Best',
        value: statistics.best,
        subtitle: `of ${statistics.count} solves`,
        color: 'success' as const,
      });
    }
    
    if (statConfig.showWorst && statistics.worst !== null) {
      cards.push({
        key: 'worst',
        label: 'Worst',
        value: statistics.worst,
        subtitle: `of ${statistics.count} solves`,
        color: 'danger' as const,
      });
    }
    
    if (statConfig.showMean && statistics.mean !== null) {
      cards.push({
        key: 'mean',
        label: 'Mean',
        value: statistics.mean,
        subtitle: `σ = ${statistics.deviation ? (statistics.deviation / 1000).toFixed(3) : '--'}s`,
      });
    }
    
    if (statConfig.showCurrent && statistics.current !== null) {
      cards.push({
        key: 'current',
        label: 'Current Session',
        value: statistics.current,
        subtitle: `last ${Math.min(12, statistics.count)} solves`,
      });
    }
    
    if (statConfig.showMo3 && statistics.mo3 !== null) {
      cards.push({
        key: 'mo3',
        label: 'Mo3',
        value: statistics.mo3,
        subtitle: 'mean of 3',
      });
    }
    
    if (statConfig.showAo5 && statistics.ao5 !== null) {
      cards.push({
        key: 'ao5',
        label: 'Ao5',
        value: statistics.ao5,
        subtitle: 'average of 5',
        target: statConfig.showTarget ? statConfig.targetTime : undefined,
      });
    }
    
    if (statConfig.showAo12 && statistics.ao12 !== null) {
      cards.push({
        key: 'ao12',
        label: 'Ao12',
        value: statistics.ao12,
        subtitle: 'average of 12',
      });
    }
    
    if (statConfig.showAo50 && statistics.ao50 !== null) {
      cards.push({
        key: 'ao50',
        label: 'Ao50',
        value: statistics.ao50,
        subtitle: 'average of 50',
      });
    }
    
    if (statConfig.showAo100 && statistics.ao100 !== null) {
      cards.push({
        key: 'ao100',
        label: 'Ao100',
        value: statistics.ao100,
        subtitle: 'average of 100',
      });
    }
    
    if (statConfig.showAo1000 && statistics.ao1000 !== null) {
      cards.push({
        key: 'ao1000',
        label: 'Ao1000',
        value: statistics.ao1000,
        subtitle: 'average of 1000',
      });
    }
    
    if (statConfig.showBpa && statistics.bpa !== null) {
      cards.push({
        key: 'bpa',
        label: 'BPA',
        value: statistics.bpa,
        subtitle: 'best personal average',
        color: 'success' as const,
      });
    }
    
    if (statConfig.showWpa && statistics.wpa !== null) {
      cards.push({
        key: 'wpa',
        label: 'WPA',
        value: statistics.wpa,
        subtitle: 'worst personal average',
        color: 'warning' as const,
      });
    }

    return cards;
  };

  const statCards = getStatCards();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center">Statistics</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsConfigOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configure Stats
            </button>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Data
            </button>
          </div>
        </div>

        {statistics.count === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No solve data yet
            </h2>
            <p className="text-gray-500 dark:text-gray-500">
              Complete some solves on the timer page to see your statistics here!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {statCards.map((card) => (
                <StatCard
                  key={card.key}
                  label={card.label}
                  value={card.value}
                  subtitle={card.subtitle}
                  color={card.color}
                  target={card.target}
                />
              ))}
            </div>

            <Graph 
              solves={solves} 
              showAverages={true} 
              averageWindow={5} 
            />

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Solves
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3">#</th>
                      <th className="text-left py-2 px-3">Time</th>
                      <th className="text-left py-2 px-3">Date</th>
                      <th className="text-left py-2 px-3">Scramble</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...solves].reverse().slice(0, 10).map((solve, index) => (
                      <tr key={solve.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-3 text-gray-500">
                          {solves.length - index}
                        </td>
                        <td className="py-2 px-3 font-mono">
                          {solve.dnf ? 'DNF' : `${(solve.time / 1000).toFixed(3)}s`}
                          {solve.plus2 && '+'}
                        </td>
                        <td className="py-2 px-3 text-gray-500">
                          {new Date(solve.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3 font-mono text-xs text-gray-400 max-w-xs truncate">
                          {solve.scramble}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <StatsConfig 
          isOpen={isConfigOpen} 
          onClose={() => setIsConfigOpen(false)} 
        />

        {showConfirmClear && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Clear All Solve Data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This will permanently delete all {statistics.count} solves and cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearSolves}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete All Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Disable static optimization for this page
export async function getServerSideProps() {
  return {
    props: {},
  };
}
