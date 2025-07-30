'use client';

import { useEffect, useState } from 'react';
import { generateScramble } from '../../utils/scrambleGenerator';

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center p-6 bg-card rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Scramble</h3>
        <p className="text-xl font-mono mb-4 leading-relaxed break-words">
          {scramble || 'Generating scramble...'}
        </p>
        <button
          onClick={generateNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          New Scramble
        </button>
      </div>
    </div>
  );
}
