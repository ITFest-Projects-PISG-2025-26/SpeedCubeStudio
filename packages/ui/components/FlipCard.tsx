import React, { useState } from 'react';
import clsx from 'clsx';

type FlipCardProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
};

export const FlipCard: React.FC<FlipCardProps> = ({ front, back, className }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={clsx("flip-card", className)}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={clsx("flip-card-inner", { flipped })}>
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
      <style jsx>{`
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          backface-visibility: hidden;
          width: 100%;
          height: 100%;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
