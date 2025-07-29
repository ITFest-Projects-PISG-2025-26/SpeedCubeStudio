// apps/frontend/src/hooks/useTimer.ts
import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // 10ms intervals
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => setTime(0);

  return { time, start, stop, reset, running };
}
