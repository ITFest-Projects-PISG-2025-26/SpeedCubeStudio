'use client';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
}

export function TimerDisplay({ time, isRunning }: TimerDisplayProps) {
  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(2);
    return seconds;
  };

  return (
    <span className="tabular-nums">
      {formatTime(time)}
    </span>
  );
}
