export type Face = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';

export type Color = 'W' | 'Y' | 'G' | 'B' | 'O' | 'R';

export type CubeState = {
  [key in Face]: Color[];
};

export type Move = string;

export interface ParsedMove {
  face: Face;
  times: number;
}
