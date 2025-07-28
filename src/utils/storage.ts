const KEY = "speedcube_solves";

export function getSolves(): number[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveSolves(times: number[]) {
  localStorage.setItem(KEY, JSON.stringify(times));
}
