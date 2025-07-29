export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}.${ms}`;
}
