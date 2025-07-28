import React from "react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";

// Dynamic imports to avoid SSR issues
const TimerDisplay = dynamic(() => import("../components/timer/TimerDisplay").then(m => ({ default: m.TimerDisplay })), { ssr: false });
const ScrambleGenerator = dynamic(() => import("../components/timer/ScrambleGenerator").then(m => ({ default: m.ScrambleGenerator })), { ssr: false });
const SolveControls = dynamic(() => import("../components/timer/SolveControls").then(m => ({ default: m.SolveControls })), { ssr: false });

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">SpeedCube Studio</h1>
          <p className="text-lg text-gray-600">Welcome to your cubing practice platform</p>
        </div>
        <ScrambleGenerator onNewScramble={(scramble) => console.log(scramble)} />
        <TimerDisplay time={0} isRunning={false} />
        <SolveControls onSolveEnd={(time) => console.log('Solve time:', time)} />
      </main>
    </div>
  );
}
