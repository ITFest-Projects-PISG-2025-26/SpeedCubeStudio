const MOVES = ['R', 'L', 'U', 'D', 'F', 'B'];
const SUFFIXES = ['', "'", '2'];

export function generateScramble(length: number = 20): string {
  const scramble: string[] = [];
  let lastMove = '';

  for (let i = 0; i < length; i++) {
    let move: string;
    do {
      move = MOVES[Math.floor(Math.random() * MOVES.length)];
    } while (move === lastMove);

    lastMove = move;
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    scramble.push(move + suffix);
  }

  return scramble.join(' ');
}
