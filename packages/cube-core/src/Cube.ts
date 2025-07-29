import { Face, CubeState, Move } from './types';
import { rotateFace, parseMove } from './utils';

export class Cube {
  state: CubeState;

  constructor() {
    this.state = this.getSolvedState();
  }

  private getSolvedState(): CubeState {
    return {
      U: Array(9).fill('W'),
      D: Array(9).fill('Y'),
      F: Array(9).fill('G'),
      B: Array(9).fill('B'),
      L: Array(9).fill('O'),
      R: Array(9).fill('R'),
    };
  }

  applyMove(move: Move) {
    const parsed = parseMove(move);
    for (let i = 0; i < parsed.times; i++) {
      rotateFace(this.state, parsed.face);
    }
  }

  applySequence(sequence: Move[]) {
    sequence.forEach((move) => this.applyMove(move));
  }

  reset() {
    this.state = this.getSolvedState();
  }

  getState(): CubeState {
    return JSON.parse(JSON.stringify(this.state));
  }
}
