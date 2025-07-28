'use client';

import { useEffect, useState } from 'react';
import { generateScramble } from '@/lib/scrambleUtils';

interface ScrambleGeneratorProps {
  onNewScramble?: (scramble: string) => void;
}

export function ScrambleGenerator({ onNewScramble }: ScrambleGeneratorProps) {
  const [scramble, setScramble] = useState('');

  const generateNew = () => {
    const newScramble = generateScramble();
    setScramble(newScramble);
    if (onNewScramble) onNewScramble(newScramble);
  };

  useEffect(() => {
    generateNew();
  }, []);

  return (
    <div className="text-xl font-mono text-center mt-4 select-none">
      <p>{scramble}</p>
      <button
        onClick={generateNew}
        className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
      >
        New Scramble
      </button>
    </div>
  );
}
