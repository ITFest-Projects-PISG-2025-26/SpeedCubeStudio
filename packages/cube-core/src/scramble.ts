import { Move } from './types';

const faces = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
const modifiers = ['', "'", '2'] as const;

export function generateScramble(length = 20): Move[] {
  const scramble: Move[] = [];
  let prevFace = '';

  for (let i = 0; i < length; i++) {
    let face;
    do {
      face = faces[Math.floor(Math.random() * faces.length)];
    } while (face === prevFace);
    prevFace = face;

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push((face + modifier) as Move);
  }

  return scramble;
}
