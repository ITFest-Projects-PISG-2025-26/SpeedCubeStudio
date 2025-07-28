'use client';

import { useEffect, useState } from 'react';

interface InspectionCountdownProps {
  startInspection: boolean;
  onComplete: () => void;
}

export function InspectionCountdown({ startInspection, onComplete }: InspectionCountdownProps) {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (!startInspection) return;

    setSeconds(15);
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startInspection]);

  if (!startInspection) return null;

  return (
    <div className="text-4xl font-mono text-center text-yellow-500 mt-4">
      Inspection: {seconds}
    </div>
  );
}
