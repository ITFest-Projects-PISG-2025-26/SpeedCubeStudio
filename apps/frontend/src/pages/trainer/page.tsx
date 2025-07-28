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
          <TrainerFilters selectedGroup="OLL" onSelectGroup={(group) => console.log(group)} />
          <VoiceToggle />
        </div>
        <CaseImage imageUrl="" />
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
