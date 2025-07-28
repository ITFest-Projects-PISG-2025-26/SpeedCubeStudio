
import React, { useEffect, useState } from 'react';
import './App.css';

type Stats = {
  best: number;
  ao5: number;
  ao12: number;
  totalSolves: number;
};

const App = () => {
  const [scramble, setScramble] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchScramble = async () => {
    const res = await fetch('/api/scramble');
    const data = await res.json();
    setScramble(data.scramble);
  };

  const fetchStats = async () => {
    const res = await fetch('/api/stats');
    const data = await res.json();
    setStats(data);
  };

  const submitSolve = async () => {
    const res = await fetch('/api/solves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: Math.random() * 20 + 5,
        penalty: '',
        date: new Date().toISOString()
      })
    });
    if (res.ok) {
      fetchStats();
    }
  };

  useEffect(() => {
    fetchScramble();
    fetchStats();
  }, []);

  return (
    <div>
      <h1>🧩 SpeedCubeStudio</h1>
      <p><strong>Scramble:</strong> {scramble}</p>
      <button onClick={fetchScramble}>New Scramble</button>
      <button onClick={submitSolve}>Simulate Solve</button>

      <h2>📊 Stats</h2>
      {stats && (
        <ul>
          <li>Best Time: {stats.best}</li>
          <li>Average of 5: {stats.ao5}</li>
          <li>Average of 12: {stats.ao12}</li>
          <li>Total Solves: {stats.totalSolves}</li>
        </ul>
      )}
    </div>
  );
};

export default App;
