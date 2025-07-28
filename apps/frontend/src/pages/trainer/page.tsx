"use client";

import React from "react";
import CaseImage from "@/components/trainer/CaseImage";
import TrainerFilters from "@/components/trainer/TrainerFilters";
import VoiceToggle from "@/components/trainer/VoiceToggle";
import { Header } from "@/components/Header";

export default function TrainerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center p-4 gap-6">
        <div className="w-full flex justify-between items-center">
          <TrainerFilters />
          <VoiceToggle />
        </div>
        <CaseImage />
      </main>
    </div>
  );
}
