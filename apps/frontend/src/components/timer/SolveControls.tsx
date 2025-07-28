'use client';

import { useEffect, useRef, useState } from 'react';

interface SolveControlsProps {
  onSolveEnd: (time: number) => void;
}

export function SolveControls({ onSolveEnd }: SolveControlsProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsRunning(true);
    const start = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - start);
    }, 10);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onSolveEnd(time);
  };

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      isRunning ? stopTimer() : startTimer();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, [isRunning, time]);

  return (
    <div className="text-center mt-6">
      <p className="text-gray-600">Press spacebar to {isRunning ? 'stop' : 'start'} the timer</p>
    </div>
  );
}
