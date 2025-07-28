import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";

// Dynamic imports to avoid SSR issues
const TimerDisplay = dynamic(() => import("../components/timer/TimerDisplay").then(m => ({ default: m.TimerDisplay })), { ssr: false });
const ScrambleGenerator = dynamic(() => import("../components/timer/ScrambleGenerator").then(m => ({ default: m.ScrambleGenerator })), { ssr: false });
const SolveControls = dynamic(() => import("../components/timer/SolveControls").then(m => ({ default: m.SolveControls })), { ssr: false });

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scramble, setScramble] = useState("");

  const handleTimerUpdate = (time: number, running: boolean) => {
    setCurrentTime(time);
    setIsTimerRunning(running);
  };

  const handleSolveEnd = (time: number) => {
    console.log('Solve completed in:', time, 'ms');
    // Here you could save the solve to the database
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">SpeedCube Studio</h1>
          <p className="text-lg text-gray-600">Welcome to your cubing practice platform</p>
        </div>
        <ScrambleGenerator onNewScramble={setScramble} />
        {scramble && (
          <div className="text-center p-4 bg-card rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Current Scramble:</p>
            <p className="text-lg font-mono">{scramble}</p>
          </div>
        )}
        <TimerDisplay time={currentTime} isRunning={isTimerRunning} />
        <SolveControls 
          onSolveEnd={handleSolveEnd}
          onTimerUpdate={handleTimerUpdate}
        />
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
