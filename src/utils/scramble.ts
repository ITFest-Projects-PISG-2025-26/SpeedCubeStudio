const moves = ["U", "D", "L", "R", "F", "B"];
const modifiers = ["", "'", "2"];

export function generateScramble(length = 20): string {
  let scramble: string[] = [];
  let prev = "";

  for (let i = 0; i < length; i++) {
    let move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === prev);
    prev = move;
    const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + mod);
  }

  return scramble.join(" ");
}
