import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { Header } from "../../components/Header";
import { useSolveStore } from "../../lib/store";
import { generateScramble } from "../../utils/scrambleGenerator";

// Dynamic imports to avoid SSR issues
const TimerDisplay = dynamic(() => import("../../components/timer/TimerDisplay").then(m => ({ default: m.TimerDisplay })), { ssr: false });

export default function TimerPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scramble, setScramble] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { addSolve, solves, statistics } = useSolveStore();

  // Generate initial scramble
  useEffect(() => {
    generateNewScramble();
  }, []);

  const generateNewScramble = () => {
    const newScramble = generateScramble();
    setScramble(newScramble);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setIsReady(false);
    setCurrentTime(0);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setCurrentTime(elapsed);
    }, 10);
  };

  const stopTimer = () => {
    if (!isTimerRunning) return;
    
    setIsTimerRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    const finalTime = Date.now() - startTimeRef.current;
    setCurrentTime(finalTime);
    
    // Add solve to store
    if (scramble && finalTime > 0) {
      console.log('✅ Adding solve:', finalTime, 'ms, scramble:', scramble);
      addSolve(finalTime, scramble);
      // Generate new scramble for next solve
      setTimeout(generateNewScramble, 100);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setCurrentTime(0);
    setIsReady(false);
    setSpacePressed(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (readyTimeoutRef.current) {
      clearTimeout(readyTimeoutRef.current);
      readyTimeoutRef.current = null;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      
      if (isTimerRunning) {
        // Stop timer
        stopTimer();
      } else if (isReady) {
        // Start timer
        startTimer();
      } else if (!spacePressed) {
        // Begin ready sequence
        setSpacePressed(true);
        readyTimeoutRef.current = setTimeout(() => {
          setIsReady(true);
        }, 300); // 300ms delay to get ready
      }
    } else if (e.code === 'KeyR' && !isTimerRunning) {
      // Reset timer
      e.preventDefault();
      resetTimer();
    } else if (e.code === 'KeyN' && !isTimerRunning) {
      // New scramble
      e.preventDefault();
      generateNewScramble();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Space' && !isTimerRunning && !isReady) {
      setSpacePressed(false);
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
      }
    };
  }, [isTimerRunning, isReady, spacePressed, scramble]);

  const getTimerColor = () => {
    if (isTimerRunning) return 'text-red-500';
    if (isReady) return 'text-green-500';
    if (spacePressed) return 'text-yellow-500';
    return 'text-gray-800';
  };

  const getTimerStatus = () => {
    if (isTimerRunning) return 'Running...';
    if (isReady) return 'Ready! Release space to start';
    if (spacePressed) return 'Hold space...';
    return 'Press and hold space to get ready';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-col items-center p-4 gap-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">Timer</h1>
          <p className="text-gray-600">Practice your solves</p>
        </div>

        {/* Scramble Display */}
        <div className="w-full max-w-3xl">
          <div className="text-center p-6 bg-card rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Scramble</h3>
              <button
                onClick={generateNewScramble}
                disabled={isTimerRunning}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                New
              </button>
            </div>
            <p className="text-xl font-mono leading-relaxed break-words">
              {scramble || 'Generating scramble...'}
            </p>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`text-8xl md:text-9xl font-mono font-bold transition-colors ${getTimerColor()}`}>
            <TimerDisplay time={currentTime} isRunning={isTimerRunning} />
          </div>
          
          <p className="text-lg text-gray-600 mt-4 text-center">
            {getTimerStatus()}
          </p>
        </div>

        {/* Controls and Stats */}
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Controls</h3>
            <div className="space-y-2 text-sm">
              <div><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> Hold to get ready, release to start/stop</div>
              <div><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">R</kbd> Reset timer</div>
              <div><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">N</kbd> New scramble</div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={resetTimer}
                disabled={isTimerRunning}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
              <button
                onClick={generateNewScramble}
                disabled={isTimerRunning}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                New Scramble
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Session Stats</h3>
            {solves.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-semibold text-green-600">
                    {statistics.best ? (statistics.best / 1000).toFixed(2) : '-'}s
                  </div>
                  <div className="text-gray-600">Best</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-600">
                    {statistics.ao5 ? (statistics.ao5 / 1000).toFixed(2) : '-'}s
                  </div>
                  <div className="text-gray-600">Ao5</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-600">
                    {statistics.ao12 ? (statistics.ao12 / 1000).toFixed(2) : '-'}s
                  </div>
                  <div className="text-gray-600">Ao12</div>
                </div>
                <div>
                  <div className="font-semibold text-orange-600">
                    {statistics.count}
                  </div>
                  <div className="text-gray-600">Solves</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No solves yet. Start timing!</p>
            )}
          </div>
        </div>

        {/* Recent Solves */}
        {solves.length > 0 && (
          <div className="w-full max-w-4xl bg-card p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Recent Solves</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {solves.slice(-6).reverse().map((solve, index) => (
                <div key={solve.id} className="p-2 bg-gray-50 rounded flex justify-between">
                  <span>{solves.length - index}.</span>
                  <span className="font-mono font-semibold">
                    {(solve.time / 1000).toFixed(2)}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
