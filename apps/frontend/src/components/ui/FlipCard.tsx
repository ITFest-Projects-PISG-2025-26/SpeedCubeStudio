'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective w-full h-full cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={cn(
          'relative w-full h-full duration-500 transform-style-preserve-3d',
          flipped && 'rotate-y-180'
        )}
      >
        <div className="absolute w-full h-full backface-hidden">
          {front}
        </div>
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
          {back}
        </div>
      </div>
    </div>
  );
}
