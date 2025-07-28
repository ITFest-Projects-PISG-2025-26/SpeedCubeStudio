// Utility functions for calculating cubing statistics

export interface CubingStats {
  average: number;
  best: number;
  worst: number;
  count: number;
  ao5: number | null; // Average of 5
  ao12: number | null; // Average of 12
  ao100: number | null; // Average of 100
}

export const calculateStats = (times: number[]): CubingStats => {
  if (times.length === 0) {
    return {
      average: 0,
      best: 0,
      worst: 0,
      count: 0,
      ao5: null,
      ao12: null,
      ao100: null,
    };
  }

  const sortedTimes = [...times].sort((a, b) => a - b);
  const sum = times.reduce((acc, time) => acc + time, 0);
  
  const stats: CubingStats = {
    average: sum / times.length,
    best: sortedTimes[0],
    worst: sortedTimes[sortedTimes.length - 1],
    count: times.length,
    ao5: calculateAverageOf(times, 5),
    ao12: calculateAverageOf(times, 12),
    ao100: calculateAverageOf(times, 100),
  };

  return stats;
};

// Calculate average of N (removing best and worst)
const calculateAverageOf = (times: number[], n: number): number | null => {
  if (times.length < n) {
    return null;
  }

  // Take the most recent n times
  const recentTimes = times.slice(-n);
  
  // Sort to remove best and worst
  const sortedTimes = [...recentTimes].sort((a, b) => a - b);
  
  // Remove the best (first) and worst (last) times
  const trimmedTimes = sortedTimes.slice(1, -1);
  
  // Calculate average of remaining times
  const sum = trimmedTimes.reduce((acc, time) => acc + time, 0);
  return sum / trimmedTimes.length;
};
