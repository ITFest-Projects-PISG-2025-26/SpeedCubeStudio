import React, { useEffect, useState } from "react";
import { generateScramble } from "../utils/scramble";

const ScrambleGenerator: React.FC = () => {
  const [scramble, setScramble] = useState("");

  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  return (
    <div className="text-xl text-center">
      Scramble: <span className="font-mono">{scramble}</span>
    </div>
  );
};

export default ScrambleGenerator;
