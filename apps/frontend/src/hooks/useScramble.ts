// apps/frontend/src/hooks/useScramble.ts
import { useState, useEffect } from "react";
import { generateScramble } from "../utils/scrambleGenerator";

export function useScramble() {
  const [scramble, setScramble] = useState<string>("");

  const newScramble = () => {
    const next = generateScramble();
    setScramble(next);
  };

  useEffect(() => {
    newScramble();
  }, []);

  return { scramble, newScramble };
}
