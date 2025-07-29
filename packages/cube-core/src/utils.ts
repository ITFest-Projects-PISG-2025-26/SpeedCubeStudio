import { CubeState, Face, Move } from './types';

export function parseMove(move: Move) {
  const face = move[0] as Face;
  const times = move.includes("2") ? 2 : move.includes("'") ? 3 : 1;
  return { face, times };
}

// Stub: Just logs for now — implement correct rotations later
export function rotateFace(state: CubeState, face: Face) {
  console.log(`Rotating face ${face}`);
  // TODO: Rotate stickers on the face and surrounding edges
}
