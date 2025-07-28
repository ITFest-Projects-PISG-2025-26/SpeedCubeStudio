import React from "react";
import { Header } from "../../components/Header";
import StatCard from "../../components/stats/StatCard";
import Graph from "../../components/stats/Graph";

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Statistics</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Best" value="5.23s" />
          <StatCard label="Ao5" value="6.12s" />
          <StatCard label="Ao12" value="6.44s" />
          <StatCard label="Ao100" value="7.01s" />
        </div>
        <Graph data={[]} />
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
