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
  {
    id: "OLL01",
    group: "OLL",
    name: "Dot Case 1",
    image: "/images/oll/OLL01.png",
    algorithms: ["f R U R' U' R U R' U' R U R' f'"],
    tags: ["dot"]
  },
  {
    id: "OLL02", 
    group: "OLL",
    name: "Dot Case 2",
    image: "/images/oll/OLL02.png",
    algorithms: ["R2 D R' U2 R D' R' U2 R'"],
    tags: ["dot"]
  },
  {
    id: "OLL21",
    group: "OLL",
    name: "T-Shape",
    image: "/images/oll/OLL21.png",
    algorithms: ["R U R' U R U' R' U R U2 R'"],
    tags: ["t-shape"]
  },
  {
    id: "OLL22",
    group: "OLL", 
    name: "T-Shape",
    image: "/images/oll/OLL22.png",
    algorithms: ["R U2 R' U' R U R' U' R U' R'"],
    tags: ["t-shape"]
  },
  {
    id: "OLL23",
    group: "OLL",
    name: "T-Shape",
    image: "/images/oll/OLL23.png", 
    algorithms: ["R2 D R' U R D' R' U R' U' R U' R'"],
    tags: ["t-shape"]
  }
];

export const pllCases: CFOPCase[] = [
  {
    id: "PLL01",
    group: "PLL",
    name: "Aa Perm",
    image: "/images/pll/PLL01.png",
    algorithms: ["x R' U R' D2 R U' R' D2 R2 x'"],
    tags: ["corner"]
  },
  {
    id: "PLL02",
    group: "PLL", 
    name: "Ab Perm",
    image: "/images/pll/PLL02.png",
    algorithms: ["x R2 D2 R U R' D2 R U' R x'"],
    tags: ["corner"]
  },
  {
    id: "PLL03",
    group: "PLL",
    name: "H Perm", 
    image: "/images/pll/PLL03.png",
    algorithms: ["M2 U M2 U2 M2 U M2"],
    tags: ["edge"]
  },
  {
    id: "PLL04",
    group: "PLL",
    name: "Ua Perm",
    image: "/images/pll/PLL04.png", 
    algorithms: ["M2 U M U2 M' U M2"],
    tags: ["edge"]
  },
  {
    id: "PLL05",
    group: "PLL",
    name: "Ub Perm",
    image: "/images/pll/PLL05.png",
    algorithms: ["M2 U' M U2 M' U' M2"],
    tags: ["edge"]
  }
];

export const f2lCases: CFOPCase[] = [
  {
    id: "F2L01",
    group: "F2L",
    name: "Basic Case 1",
    image: "/images/f2l/F2L01.png",
    algorithms: ["R U' R' U R U R'"],
    tags: ["basic"]
  },
  {
    id: "F2L02",
    group: "F2L",
    name: "Basic Case 2", 
    image: "/images/f2l/F2L02.png",
    algorithms: ["F' U F U' R U R'"],
    tags: ["basic"]
  },
  {
    id: "F2L03",
    group: "F2L",
    name: "Corner up, edge in slot",
    image: "/images/f2l/F2L03.png",
    algorithms: ["R U R' U' R U R'"],
    tags: ["corner-up"]
  },
  {
    id: "F2L04",
    group: "F2L",
    name: "Edge up, corner in slot",
    image: "/images/f2l/F2L04.png", 
    algorithms: ["U R U' R' U F' U F"],
    tags: ["edge-up"]
  },
  {
    id: "F2L05",
    group: "F2L",
    name: "Both pieces separated",
    image: "/images/f2l/F2L05.png",
    algorithms: ["R U' R' U R U' R' U2 R U' R'"],
    tags: ["separated"]
  }
];

export const cfopData: { [key: string]: CFOPCase[] } = {
  OLL: ollCases,
  PLL: pllCases,
  F2L: f2lCases,
};
