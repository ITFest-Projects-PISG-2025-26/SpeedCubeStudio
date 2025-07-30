import React from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { useSolveStore } from "../lib/store";

export default function HomePage() {
  const { solves, statistics } = useSolveStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center p-8 gap-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SpeedCube Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8">Your ultimate cubing practice platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          <Link href="/timer" className="group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white transform transition-transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Timer</h3>
              <p className="text-green-100">Practice your solves with our advanced timer</p>
            </div>
          </Link>

          <Link href="/stats" className="group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white transform transition-transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-xl font-semibold mb-2">Statistics</h3>
              <p className="text-blue-100">Track your progress and analyze performance</p>
            </div>
          </Link>

          <Link href="/solver" className="group">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white transform transition-transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-2">🧩</div>
              <h3 className="text-xl font-semibold mb-2">Solver</h3>
              <p className="text-purple-100">Get solutions for any cube configuration</p>
            </div>
          </Link>

          <Link href="/trainer" className="group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white transform transition-transform hover:scale-105 shadow-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Trainer</h3>
              <p className="text-orange-100">Learn algorithms and improve technique</p>
            </div>
          </Link>
        </div>

        {solves.length > 0 && (
          <div className="bg-card p-6 rounded-xl border w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {statistics.best ? (statistics.best / 1000).toFixed(2) : '-'}s
                </div>
                <div className="text-sm text-gray-600">Best</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {statistics.ao5 ? (statistics.ao5 / 1000).toFixed(2) : '-'}s
                </div>
                <div className="text-sm text-gray-600">Ao5</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {statistics.ao12 ? (statistics.ao12 / 1000).toFixed(2) : '-'}s
                </div>
                <div className="text-sm text-gray-600">Ao12</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {statistics.count}
                </div>
                <div className="text-sm text-gray-600">Total Solves</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-500">Ready to start cubing?</p>
          <Link 
            href="/timer" 
            className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Start Timer
          </Link>
        </div>
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
