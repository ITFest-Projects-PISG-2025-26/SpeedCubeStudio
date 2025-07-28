"use client";

import React from "react";
import { Header } from "@/components/Header";
import ColorPickerCube from "@/components/solver/ColorPickerCube";
import MoveBreakdown from "@/components/solver/MoveBreakdown";
import Cube3DViewer from "@/components/solver/Cube3DViewer";

export default function SolverPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold">Rubik’s Cube Solver</h1>
        <ColorPickerCube />
        <Cube3DViewer />
        <MoveBreakdown moves={[]} />
      </main>
    </div>
  );
}
