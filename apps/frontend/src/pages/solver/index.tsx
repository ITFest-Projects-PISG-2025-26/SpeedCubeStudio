import React, { useState } from "react";
import { Header } from "../../components/Header";
import ColorPickerCube from "../../components/solver/ColorPickerCube";
import MoveBreakdown from "../../components/solver/MoveBreakdown";
import Cube3DViewer from "../../components/solver/Cube3DViewer";
import { Button } from "../../components/ui/Button";

type Face = "U" | "D" | "F" | "B" | "L" | "R";
type CubeState = Record<Face, string[][]>;

export default function SolverPage() {
  const [cubeState, setCubeState] = useState<CubeState | null>(null);
  const [solution, setSolution] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCubeChange = (newCubeState: CubeState) => {
    setCubeState(newCubeState);
    setSolution([]); // Clear previous solution
  };

  const solveCube = async () => {
    if (!cubeState) return;
    
    setIsLoading(true);
    try {
      // This is a placeholder - in a real implementation, you would:
      // 1. Convert the cube state to a format your solver expects
      // 2. Call your solving algorithm (possibly from the cube-core package)
      // 3. Return the solution moves
      
      // For now, showing a mock solution
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate solving time
      const mockSolution = ["R", "U", "R'", "U'", "R", "U", "R'", "F", "R", "F'"];
      setSolution(mockSolution);
    } catch (error) {
      console.error("Error solving cube:", error);
      setSolution(["Error: Could not solve cube"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 flex flex-col gap-6 items-center max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Rubik's Cube Solver</h1>
          <p className="text-gray-600">Set up your cube colors and get the solution</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 w-full">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Color Picker</h2>
            <ColorPickerCube onChange={handleCubeChange} />
            <Button 
              onClick={solveCube}
              disabled={!cubeState || isLoading}
              className="w-full"
            >
              {isLoading ? "Solving..." : "Solve Cube"}
            </Button>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3D Preview</h2>
            <Cube3DViewer />
          </div>
        </div>
        
        {solution.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <MoveBreakdown moves={solution} />
          </div>
        )}
      </main>
    </div>
  );
}

// Disable static optimization for this page
export async function getServerSideProps() {
  return {
    props: {},
  };
}
