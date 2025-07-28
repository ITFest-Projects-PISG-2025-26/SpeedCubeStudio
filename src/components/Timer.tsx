import React, { useEffect, useState } from "react";
import { getSolves, saveSolves } from "../utils/storage";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [solves, setSolves] = useState<number[]>(getSolves());

  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (running) {
        const final = Math.round(time / 10) / 100;
        const updated = [...solves, final];
        setSolves(updated);
        saveSolves(updated);
      }
      setRunning(!running);
      if (!running) setTime(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [time, running]);

  return (
    <div className="text-5xl font-bold">{(time / 1000).toFixed(2)}s</div>
  );
};

export default Timer;
