// apps/frontend/src/lib/cfopData.ts
export interface CFOPCase {
  id: string;
  group: string;
  name: string;
  image: string;
  algorithms: string[];
  tags: string[];
}

// Since we can't import JSON directly in TypeScript, let's create the data structure
export const ollCases: CFOPCase[] = [
  // Dot Cases (1-4)
  {
    id: "OLL01",
    group: "OLL",
    name: "Dot Case 1",
    image: "/images/oll/OLL01.png",
    algorithms: ["f R U R' U' R U R' U' R U R' f'", "F U R U' R' F'"],
    tags: ["dot"]
  },
  {
    id: "OLL02", 
    group: "OLL",
    name: "Dot Case 2",
    image: "/images/oll/OLL02.png",
    algorithms: ["R2 D R' U2 R D' R' U2 R'", "F R U R' U' F' U2 F U R U' R' F'"],
    tags: ["dot"]
  },
  {
    id: "OLL03",
    group: "OLL",
    name: "Dot Case 3",
    image: "/images/oll/OLL03.png",
    algorithms: ["f R U R' U' f' U' F R U R' U' F'", "R U2 R2 F R F' U2 R' F R F'"],
    tags: ["dot"]
  },
  {
    id: "OLL04",
    group: "OLL",
    name: "Dot Case 4", 
    image: "/images/oll/OLL04.png",
    algorithms: ["f R U R' U' f' U F R U R' U' F'", "L' U2 L2 F' L' F U2 L F' L' F"],
    tags: ["dot"]
  },
  // I-Shape Cases (5-6)
  {
    id: "OLL05",
    group: "OLL",
    name: "I-Shape 1",
    image: "/images/oll/OLL05.png",
    algorithms: ["r' U' R U' R' U R U' R' U2 r", "R U R' U R U' R' U R U2 R'"],
    tags: ["i-shape"]
  },
  {
    id: "OLL06",
    group: "OLL",
    name: "I-Shape 2", 
    image: "/images/oll/OLL06.png",
    algorithms: ["r U R' U R U' R' U R U2 r'", "L' U' L U' L' U L U' L' U2 L"],
    tags: ["i-shape"]
  },
  // L-Shape Cases (7-10)
  {
    id: "OLL07",
    group: "OLL",
    name: "L-Shape 1",
    image: "/images/oll/OLL07.png",
    algorithms: ["r U R' U R U2 r'", "L' U' L U' L' U2 L"],
    tags: ["l-shape"]
  },
  {
    id: "OLL08",
    group: "OLL",
    name: "L-Shape 2",
    image: "/images/oll/OLL08.png", 
    algorithms: ["r' U' R U' R' U2 r", "R U R' U R U2 R'"],
    tags: ["l-shape"]
  },
  {
    id: "OLL09",
    group: "OLL",
    name: "L-Shape 3",
    image: "/images/oll/OLL09.png",
    algorithms: ["R U R' U' R' F R2 U R' U' F'", "R U R' F' R U R' U' R' F R2 U' R'"],
    tags: ["l-shape"]
  },
  {
    id: "OLL10",
    group: "OLL",
    name: "L-Shape 4",
    image: "/images/oll/OLL10.png",
    algorithms: ["R U R' U R' F R F' R U2 R'", "L' U' L U L F' L' F L' U2 L"],
    tags: ["l-shape"]
  },
  // T-Shape Cases (11-16)
  {
    id: "OLL11",
    group: "OLL",
    name: "T-Shape 1",
    image: "/images/oll/OLL11.png",
    algorithms: ["r' R2 U R' U R U2 R' U M'", "R U2 R' U' R U R' U' R U' R'"],
    tags: ["t-shape"]
  },
  {
    id: "OLL12",
    group: "OLL",
    name: "T-Shape 2",
    image: "/images/oll/OLL12.png",
    algorithms: ["r R2 U' R U' R' U2 R U' r", "L' U2 L U L' U' L U L' U L"],
    tags: ["t-shape"]
  },
  {
    id: "OLL13",
    group: "OLL",
    name: "T-Shape 3",
    image: "/images/oll/OLL13.png",
    algorithms: ["r U' r' U' r U r' F' U F", "F U R U' R' F' R U R' U' R' F R F'"],
    tags: ["t-shape"]
  },
  {
    id: "OLL14",
    group: "OLL",
    name: "T-Shape 4",
    image: "/images/oll/OLL14.png",
    algorithms: ["R' F R U R' F' R F U' F'", "r' U r U r' U' r F U' F'"],
    tags: ["t-shape"]
  },
  {
    id: "OLL15",
    group: "OLL",
    name: "T-Shape 5",
    image: "/images/oll/OLL15.png",
    algorithms: ["l' U' l L' U' L U l' U l", "R' F' L' F R F' L F"],
    tags: ["t-shape"]
  },
  {
    id: "OLL16",
    group: "OLL",
    name: "T-Shape 6",
    image: "/images/oll/OLL16.png",
    algorithms: ["r U r' R U R' U' r U' r'", "L F R F' L' F R' F'"],
    tags: ["t-shape"]
  },
  // Cross Cases (17-20)
  {
    id: "OLL17",
    group: "OLL",
    name: "Cross 1",
    image: "/images/oll/OLL17.png",
    algorithms: ["R U R' U R' F R F' U2 R' F R F'", "F R' F' R2 r' U R U' R' U' M'"],
    tags: ["cross"]
  },
  {
    id: "OLL18",
    group: "OLL",
    name: "Cross 2",
    image: "/images/oll/OLL18.png",
    algorithms: ["r U R' U R U2 r2 U' R U' R' U2 r", "F R U R' U' F' U F R U R' U' F'"],
    tags: ["cross"]
  },
  {
    id: "OLL19",
    group: "OLL",
    name: "Cross 3",
    image: "/images/oll/OLL19.png",
    algorithms: ["r' R U R U R' U' M' R' F R F'", "R' U' R' U' R' U R U R U2 R'"],
    tags: ["cross"]
  },
  {
    id: "OLL20",
    group: "OLL",
    name: "Cross 4",
    image: "/images/oll/OLL20.png",
    algorithms: ["r U R' U' M2 U R U' R' U' M'", "F R U R' U' R U R' U' F' R U R' U' R' F R F'"],
    tags: ["cross"]
  },
  // P-Shape Cases (21-22)
  {
    id: "OLL21",
    group: "OLL",
    name: "P-Shape 1",
    image: "/images/oll/OLL21.png",
    algorithms: ["R U R' U R U' R' U R U2 R'", "R U2 R' U' R U R' U' R U' R'"],
    tags: ["p-shape"]
  },
  {
    id: "OLL22",
    group: "OLL",
    name: "P-Shape 2",
    image: "/images/oll/OLL22.png",
    algorithms: ["R U2 R2 U' R2 U' R2 U2 R", "L' U2 L2 U L2 U L2 U2 L'"],
    tags: ["p-shape"]
  }
];

export const pllCases: CFOPCase[] = [
  // Corner Permutation Cases
  {
    id: "PLL01",
    group: "PLL",
    name: "Aa Perm",
    image: "/images/pll/PLL01.png",
    algorithms: ["x R' U R' D2 R U' R' D2 R2 x'", "R' F R' B2 R F' R' B2 R2"],
    tags: ["corner", "adjacent"]
  },
  {
    id: "PLL02",
    group: "PLL",
    name: "Ab Perm",
    image: "/images/pll/PLL02.png",
    algorithms: ["x R2 D2 R U R' D2 R U' R x'", "R B' R F2 R' B R F2 R2"],
    tags: ["corner", "adjacent"]
  },
  {
    id: "PLL03",
    group: "PLL",
    name: "E Perm",
    image: "/images/pll/PLL03.png",
    algorithms: ["x' R U' R' D R U R' D R U R' D R U' R' D' x", "R B' R' F R B R' F' R B R' F R B' R' F'"],
    tags: ["corner", "diagonal"]
  },
  // Edge Permutation Cases
  {
    id: "PLL04",
    group: "PLL",
    name: "H Perm",
    image: "/images/pll/PLL04.png",
    algorithms: ["M2 U M2 U2 M2 U M2", "R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"],
    tags: ["edge", "opposite"]
  },
  {
    id: "PLL05",
    group: "PLL",
    name: "Ua Perm",
    image: "/images/pll/PLL05.png",
    algorithms: ["R U' R U R U R U' R' U' R2", "M2 U M U2 M' U M2"],
    tags: ["edge", "adjacent"]
  },
  {
    id: "PLL06",
    group: "PLL",
    name: "Ub Perm",
    image: "/images/pll/PLL06.png",
    algorithms: ["R2 U R U R' U' R' U' R' U R'", "M2 U' M U2 M' U' M2"],
    tags: ["edge", "adjacent"]
  },
  {
    id: "PLL07",
    group: "PLL",
    name: "Z Perm",
    image: "/images/pll/PLL07.png",
    algorithms: ["M' U M2 U M2 U M' U2 M2", "R' U' R U' R U R U' R' U R U R2 U' R'"],
    tags: ["edge", "diagonal"]
  },
  // Corner + Edge Cases
  {
    id: "PLL08",
    group: "PLL",
    name: "T Perm",
    image: "/images/pll/PLL08.png",
    algorithms: ["R U R' F' R U R' U' R' F R2 U' R'", "R2 U R2 U' R2 U' D R2 U' R2 U R2 D'"],
    tags: ["corner-edge"]
  },
  {
    id: "PLL09",
    group: "PLL",
    name: "F Perm",
    image: "/images/pll/PLL09.png",
    algorithms: ["R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", "R' U2 R' d' R' F' R2 U' R' U R' F R U' F"],
    tags: ["corner-edge"]
  },
  {
    id: "PLL10",
    group: "PLL",
    name: "Ja Perm",
    image: "/images/pll/PLL10.png",
    algorithms: ["x R2 F R F' R U2 r' U r U2 x'", "R' U L' U2 R U' R' U2 R L U'"],
    tags: ["corner-edge"]
  },
  {
    id: "PLL11",
    group: "PLL",
    name: "Jb Perm",
    image: "/images/pll/PLL11.png",
    algorithms: ["R U R' F' R U R' U' R' F R2 U' R'", "R U2 R' U' R U2 L' U R' U' L"],
    tags: ["corner-edge"]
  },
  {
    id: "PLL12",
    group: "PLL",
    name: "Ra Perm",
    image: "/images/pll/PLL12.png",
    algorithms: ["R U R' F' R U2 R' U2 R' F R U R U2 R'", "R U' R' U' R U R D R' U' R D' R' U2 R'"],
    tags: ["corner-edge"]
  },
  {
    id: "PLL13",
    group: "PLL",
    name: "Rb Perm",
    image: "/images/pll/PLL13.png",
    algorithms: ["R' U2 R U2 R' F R U R' U' R' F' R2 U'", "R' U2 R' D' R U' R' D R U R U' R' U' R"],
    tags: ["corner-edge"]
  },
  // G Perms
  {
    id: "PLL14",
    group: "PLL",
    name: "Ga Perm",
    image: "/images/pll/PLL14.png",
    algorithms: ["R2 U R' U R' U' R U' R2 D U' R' U R D'", "R2 u R' U R' U' R u' R2 y' R' U R"],
    tags: ["corner-edge", "g-perm"]
  },
  {
    id: "PLL15",
    group: "PLL",
    name: "Gb Perm",
    image: "/images/pll/PLL15.png",
    algorithms: ["R' U' R U D' R2 U R' U R U' R U' R2 D", "F' U' F R2 u R' U R U' R u' R2"],
    tags: ["corner-edge", "g-perm"]
  },
  {
    id: "PLL16",
    group: "PLL",
    name: "Gc Perm",
    image: "/images/pll/PLL16.png",
    algorithms: ["R2 U' R U' R U R' U R2 D' U R U' R' D", "R2 u' R U' R U R' u R2 y R U' R'"],
    tags: ["corner-edge", "g-perm"]
  },
  {
    id: "PLL17",
    group: "PLL",
    name: "Gd Perm",
    image: "/images/pll/PLL17.png",
    algorithms: ["R U R' U' D R2 U' R U' R' U R' U R2 D'", "R U R' y' R2 u' R U' R' U R' u R2"],
    tags: ["corner-edge", "g-perm"]
  },
  // N Perms
  {
    id: "PLL18",
    group: "PLL",
    name: "Na Perm",
    image: "/images/pll/PLL18.png",
    algorithms: ["R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", "z U R' D R2 U' R U' R' D R U R' D R2 U' R D' z'"],
    tags: ["corner-edge", "n-perm"]
  },
  {
    id: "PLL19",
    group: "PLL",
    name: "Nb Perm",
    image: "/images/pll/PLL19.png",
    algorithms: ["R' U R U' R' F' U' F R U R' F R' F' R U' R", "z D' R U' R2 D R' D R U' R' D' R U' R2 D R' z'"],
    tags: ["corner-edge", "n-perm"]
  },
  // V Perm
  {
    id: "PLL20",
    group: "PLL",
    name: "V Perm",
    image: "/images/pll/PLL20.png",
    algorithms: ["R' U R' d' R' F' R2 U' R' U R' F R F", "R' U R' U' y R' F' R2 U' R' U R' F R F"],
    tags: ["corner-edge"]
  },
  // Y Perm
  {
    id: "PLL21",
    group: "PLL",
    name: "Y Perm",
    image: "/images/pll/PLL21.png",
    algorithms: ["F R U' R' U' R U R' F' R U R' U' R' F R F'", "R2 U' R2 U' R2 U R' F R U R U' R' F' R"],
    tags: ["corner-edge"]
  }
];

export const f2lCases: CFOPCase[] = [
  {
    id: "F2L01",
    group: "F2L",
    name: "Basic Insert 1",
    image: "/images/f2l/F2L01.png",
    algorithms: ["R U' R' U R U R'", "F R' F' R U R U' R'"],
    tags: ["basic", "separated"]
  },
  {
    id: "F2L02",
    group: "F2L",
    name: "Basic Insert 2", 
    image: "/images/f2l/F2L02.png",
    algorithms: ["F' U F U' R U R'", "R U R' U' F' U F"],
    tags: ["basic", "corner-up"]
  },
  {
    id: "F2L03",
    group: "F2L",
    name: "Corner up, edge in slot",
    image: "/images/f2l/F2L03.png",
    algorithms: ["R U' R' d R' U2 R", "R U R' U' R U R'"],
    tags: ["corner-up", "edge-slot"]
  },
  {
    id: "F2L04",
    group: "F2L",
    name: "Edge up, corner in slot",
    image: "/images/f2l/F2L04.png", 
    algorithms: ["U R U' R' U F' U F", "d R' U2 R d' R U R'"],
    tags: ["edge-up", "corner-slot"]
  },
  {
    id: "F2L05",
    group: "F2L",
    name: "Both pieces separated",
    image: "/images/f2l/F2L05.png",
    algorithms: ["R U' R' U R U' R' U2 R U' R'", "R U R' U2 R U' R' U R U' R'"],
    tags: ["separated", "top-layer"]
  },
  {
    id: "F2L06",
    group: "F2L",
    name: "Corner and edge connected",
    image: "/images/f2l/F2L06.png",
    algorithms: ["R U R' U' R U R'", "y' R' U' R U R' U' R"],
    tags: ["connected", "pair"]
  },
  {
    id: "F2L07",
    group: "F2L",
    name: "Corner facing up",
    image: "/images/f2l/F2L07.png",
    algorithms: ["U' R U' R' U2 R U' R'", "d R' U' R U2 R' U R"],
    tags: ["corner-facing", "white-top"]
  },
  {
    id: "F2L08",
    group: "F2L",
    name: "Edge facing up",
    image: "/images/f2l/F2L08.png",
    algorithms: ["U R U2 R' U R U' R'", "U F' U2 F U F' U' F"],
    tags: ["edge-facing", "white-front"]
  },
  {
    id: "F2L09",
    group: "F2L",
    name: "Corner and edge misaligned",
    image: "/images/f2l/F2L09.png",
    algorithms: ["R U' R' U' R U R' U2 R U' R'", "y' R' U R U' R' U R U2 R' U R"],
    tags: ["misaligned", "setup"]
  },
  {
    id: "F2L10",
    group: "F2L",
    name: "Edge flipped in slot",
    image: "/images/f2l/F2L10.png",
    algorithms: ["R U R' U' R U' R' U R U R'", "F' U F U F' U2 F"],
    tags: ["edge-flipped", "troublesome"]
  },
  {
    id: "F2L11",
    group: "F2L",
    name: "Corner flipped in slot",
    image: "/images/f2l/F2L11.png",
    algorithms: ["R U2 R' U' R U R'", "F R' F' R2 U R'"],
    tags: ["corner-flipped", "troublesome"]
  },
  {
    id: "F2L12",
    group: "F2L",
    name: "Both flipped in slot",
    image: "/images/f2l/F2L12.png",
    algorithms: ["R U' R' d R' U R", "F R F' R' U R U' R'"],
    tags: ["both-flipped", "advanced"]
  },
  {
    id: "F2L13",
    group: "F2L",
    name: "Corner in wrong slot",
    image: "/images/f2l/F2L13.png",
    algorithms: ["R U' R' U R U2 R' U R U' R'", "R' F R F' R U2 R' U R U' R'"],
    tags: ["wrong-slot", "corner"]
  },
  {
    id: "F2L14",
    group: "F2L",
    name: "Edge in wrong slot",
    image: "/images/f2l/F2L14.png",
    algorithms: ["R U R' U' R U R' U' R U R'", "R U' R' U2 R U R' U R U' R'"],
    tags: ["wrong-slot", "edge"]
  },
  {
    id: "F2L15",
    group: "F2L",
    name: "Advanced pair setup",
    image: "/images/f2l/F2L15.png",
    algorithms: ["R U2 R' U2 R U' R'", "U R U' R' U' R U R' U R U' R'"],
    tags: ["advanced", "setup"]
  }
];

export const cfopData: { [key: string]: CFOPCase[] } = {
  OLL: ollCases,
  PLL: pllCases,
  F2L: f2lCases,
};
