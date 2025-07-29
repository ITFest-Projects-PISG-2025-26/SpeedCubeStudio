// apps/frontend/src/components/stats/Graph.tsx
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SolveRecord } from "../../lib/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  solves: SolveRecord[];
  showAverages?: boolean;
  averageWindow?: number;
}

const Graph: React.FC<GraphProps> = ({ solves, showAverages = true, averageWindow = 5 }) => {
  // Filter out DNF solves and prepare data
  const validSolves = solves.filter(solve => !solve.dnf);
  
  if (validSolves.length === 0) {
    return (
      <div className="w-full h-64 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Solve Times</h3>
        <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <p className="text-lg">No solve data available</p>
            <p className="text-sm mt-2">Complete some solves to see your progress!</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare solve times data
  const solveLabels = validSolves.map((_, index) => `${index + 1}`);
  const solveTimes = validSolves.map(solve => solve.time / 1000); // Convert to seconds

  // Calculate rolling averages
  const averages: number[] = [];
  if (showAverages && validSolves.length >= averageWindow) {
    for (let i = averageWindow - 1; i < solveTimes.length; i++) {
      const window = solveTimes.slice(i - averageWindow + 1, i + 1);
      if (averageWindow <= 3) {
        // Simple average for Mo3
        const avg = window.reduce((sum, time) => sum + time, 0) / window.length;
        averages.push(avg);
      } else {
        // Trimmed average for Ao5+
        const sorted = [...window].sort((a, b) => a - b);
        const trimmed = sorted.slice(1, -1);
        const avg = trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
        averages.push(avg);
      }
    }
  }

  const chartData = {
    labels: solveLabels,
    datasets: [
      {
        label: 'Solve Time',
        data: solveTimes,
        borderColor: 'rgb(59, 130, 246)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      ...(showAverages && averages.length > 0 ? [{
        label: `Ao${averageWindow}`,
        data: [
          ...Array(averageWindow - 1).fill(null), // Fill gaps at the beginning
          ...averages
        ],
        borderColor: 'rgb(239, 68, 68)', // Red
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        tension: 0.3,
        borderDash: [5, 5],
      }] : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(107, 114, 128)', // Gray-500
        },
      },
      title: {
        display: true,
        text: `Solve Progress (${validSolves.length} solves)`,
        color: 'rgb(107, 114, 128)',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value.toFixed(3)}s`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Time (seconds)',
          color: 'rgb(107, 114, 128)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          callback: function(value) {
            return `${Number(value).toFixed(1)}s`;
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Solve Number',
          color: 'rgb(107, 114, 128)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          maxTicksLimit: 20,
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'rgb(59, 130, 246)',
      },
    },
  };

  return (
    <div className="w-full h-80 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
      <div className="h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Graph;
