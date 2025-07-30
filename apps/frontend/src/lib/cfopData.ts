// apps/frontend/src/lib/cfopData.ts
export interface CFOPCase {
  id: string;
  group: string;
  name: string;
  image: string;
  algorithms: string[];
  tags: string[];
}

// Import all CFOP data dynamically from the JSON files
import f2lData from '../../../../packages/cfop-data/f2l.json';
import ollData from '../../../../packages/cfop-data/oll.json';
import pllData from '../../../../packages/cfop-data/pll.json';

// Type the imported data as CFOPCase arrays
export const f2lCases: CFOPCase[] = f2lData as CFOPCase[];
export const ollCases: CFOPCase[] = ollData as CFOPCase[];
export const pllCases: CFOPCase[] = pllData as CFOPCase[];

