// apps/frontend/src/lib/cases.ts
// Mock CFOP data for now - replace with actual data when needed
export const OLLCases = [
  {
    id: "OLL01",
    group: "OLL",
    name: "Dot case 1",
    algorithm: "R U2 R2 F R F' U2 R' F R F'",
    description: "Basic OLL case"
  }
];

export const PLLCases = [
  {
    id: "PLL01", 
    group: "PLL",
    name: "T-perm",
    algorithm: "R U R' F' R U R' U' R' F R2 U' R'",
    description: "Basic PLL case"
  }
];

export const F2LCases = [
  {
    id: "F2L01",
    group: "F2L", 
    name: "Basic case 1",
    algorithm: "R U' R'",
    description: "Basic F2L case"
  }
];
