'use client';

import { useEffect, useState } from 'react';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
}

export function TimerDisplay({ time, isRunning }: TimerDisplayProps) {
  console.log('⏱️ TimerDisplay render - time:', time, 'isRunning:', isRunning);
  
  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(3);
    return seconds;
  };

  return (
    <div
      className={`text-6xl font-mono text-center transition-colors ${
        isRunning ? 'text-red-500' : 'text-green-600'
      }`}
    >
      {formatTime(time)}
    </div>
  );
}
