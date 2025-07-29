// apps/frontend/src/hooks/useVoice.ts
import { useState } from "react";
import { speak } from "../lib/voice";

export function useVoice() {
  const [enabled, setEnabled] = useState<boolean>(true);

  const toggle = () => setEnabled((prev) => !prev);

  const speakCase = (text: string) => {
    if (enabled) speak(text);
  };

  return { enabled, toggle, speakCase };
}
