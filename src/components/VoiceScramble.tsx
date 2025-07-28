import React from "react";

const VoiceScramble: React.FC = () => {
  const speakScramble = () => {
    const scramble = document.querySelector("span.font-mono")?.textContent || "";
    const utter = new SpeechSynthesisUtterance(scramble);
    speechSynthesis.speak(utter);
  };

  return (
    <button onClick={speakScramble} className="bg-yellow-500 text-black p-1 rounded">
      Voice Scramble
    </button>
  );
};

export default VoiceScramble;
