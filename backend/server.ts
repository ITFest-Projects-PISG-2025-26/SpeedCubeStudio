
import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const SOLVES_FILE = path.join(__dirname, 'solves.json');

async function getSolves(): Promise<any[]> {
  try {
    await fs.ensureFile(SOLVES_FILE);
    const data = await fs.readFile(SOLVES_FILE, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

async function saveSolves(solves: any[]) {
  await fs.writeFile(SOLVES_FILE, JSON.stringify(solves, null, 2));
}

const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
const modifiers = ['', "'", '2'];

function generateScramble(length = 20): string {
  let scramble = [];
  let prev = '';

  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === prev);
    prev = move;

    const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + mod);
  }

  return scramble.join(' ');
}

app.get('/api/scramble', (req, res) => {
  res.json({ scramble: generateScramble() });
});

app.post('/api/solves', async (req, res) => {
  const { time, penalty, date } = req.body;
  if (typeof time !== 'number' || !date) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const solves = await getSolves();
  solves.push({ time, penalty, date });
  await saveSolves(solves);

  res.json({ message: 'Solve saved!' });
});

function calculateStats(solves: any[]) {
  const times = solves.map(s => {
    if (s.penalty === '+2') return s.time + 2;
    if (s.penalty === 'DNF') return null;
    return s.time;
  }).filter(t => t !== null);

  const best = Math.min(...times);
  const avg = (arr: number[], n: number) => {
    if (arr.length < n) return null;
    const latest = arr.slice(-n).sort((a, b) => a - b);
    return Number((latest.reduce((a, b) => a + b, 0) / n).toFixed(2));
  };

  return {
    best,
    ao5: avg(times, 5),
    ao12: avg(times, 12),
    totalSolves: solves.length
  };
}

app.get('/api/stats', async (req, res) => {
  const solves = await getSolves();
  res.json(calculateStats(solves));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
