import React from "react";
import TimerDisplay from "@/components/timer/TimerDisplay";
import ScrambleGenerator from "@/components/timer/ScrambleGenerator";
import SolveControls from "@/components/timer/SolveControls";
import InspectionCountdown from "@/components/timer/InspectionCountdown";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center p-4 gap-6">
        <ScrambleGenerator />
        <TimerDisplay />
        <InspectionCountdown />
        <SolveControls />
      </main>
    </div>
  );
}
