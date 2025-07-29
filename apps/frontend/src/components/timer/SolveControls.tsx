'use client';

import { useEffect, useRef, useState } from 'react';

interface SolveControlsProps {
  onSolveEnd: (time: number) => void;
  onTimerUpdate?: (time: number, running: boolean) => void;
}

export function SolveControls({ onSolveEnd, onTimerUpdate }: SolveControlsProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    console.log('🚀 SolveControls: startTimer called');
    setIsRunning(true);
    setTime(0);
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now() - start;
      setTime(currentTime);
      onTimerUpdate?.(currentTime, true);
    }, 10);
  };

  const stopTimer = () => {
    console.log('🛑 SolveControls: stopTimer called, final time:', time);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onTimerUpdate?.(time, false);
    onSolveEnd(time);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onTimerUpdate?.(0, false);
  };

  const handleSpacebar = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      console.log('⌨️ SolveControls: Spacebar pressed, isRunning:', isRunning);
      e.preventDefault();
      if (isRunning) {
        stopTimer();
      } else {
        startTimer();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Reset timer with 'R' key
    if (e.code === 'KeyR' && !isRunning) {
      e.preventDefault();
      resetTimer();
    }
    // Spacebar for start/stop
    else if (e.code === 'Space') {
      handleSpacebar(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  console.log('🔄 SolveControls render - isRunning:', isRunning, 'time:', time);

  return (
    <div className="text-center mt-6 space-y-4">
      <div className="flex gap-4 justify-center">
        <button
          onClick={isRunning ? stopTimer : startTimer}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isRunning 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        {!isRunning && time > 0 && (
          <button
            onClick={resetTimer}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-600 hover:bg-gray-700 text-white transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> to {isRunning ? 'stop' : 'start'} the timer</p>
        {!isRunning && time > 0 && (
          <p>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">R</kbd> to reset</p>
        )}
      </div>
    </div>
  );
}
