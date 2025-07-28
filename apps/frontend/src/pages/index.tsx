import React from "react";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { ScrambleGenerator } from "@/components/timer/ScrambleGenerator";
import { SolveControls } from "@/components/timer/SolveControls";
import { Header } from "@/components/Header";

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

// Force server-side rendering to avoid static generation errors
export async function getServerSideProps() {
  return {
    props: {},
  };
}
