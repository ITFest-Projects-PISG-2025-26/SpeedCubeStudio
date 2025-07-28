// apps/frontend/src/lib/voice.ts
export function speak(text: string): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
