export function calculateAverages(times: number[]) {
  const valid = times.filter(t => t > 0);
  const average = (arr: number[]) =>
    arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : "-";

  return {
    ao5: average(valid.slice(-5)),
    ao12: average(valid.slice(-12)),
    ao50: average(valid.slice(-50)),
    ao100: average(valid.slice(-100)),
    best: Math.min(...valid),
    worst: Math.max(...valid)
  };
}
