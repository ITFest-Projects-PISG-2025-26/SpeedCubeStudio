// apps/frontend/src/hooks/useVoice.ts
import { useState } from "react";
import { speak, speakAlgorithm, speakCaseName } from "../lib/voice";

export function useVoice() {
  const [enabled, setEnabled] = useState<boolean>(true);

  const toggle = () => setEnabled((prev) => !prev);

  const speakCase = (text: string) => {
    if (enabled) speak(text);
  };

  const speakCaseWithName = (caseName: string, group: string) => {
    if (enabled) speakCaseName(caseName, group);
  };

  const speakAlgorithmText = (algorithm: string) => {
    if (enabled) speakAlgorithm(algorithm);
  };

  return { 
    enabled, 
    toggle, 
    speakCase, 
    speakCaseWithName, 
    speakAlgorithmText 
  };
}
