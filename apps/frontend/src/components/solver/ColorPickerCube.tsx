// apps/frontend/src/components/solver/ColorPickerCube.tsx
import React, { useState } from "react";
import { cubeColors } from "../../utils/colors";

type Face = "U" | "D" | "F" | "B" | "L" | "R";
type CubeState = Record<Face, string[][]>;

const defaultCube: CubeState = {
  U: Array(3).fill(null).map(() => Array(3).fill("white")),
  D: Array(3).fill(null).map(() => Array(3).fill("yellow")),
  F: Array(3).fill(null).map(() => Array(3).fill("green")),
  B: Array(3).fill(null).map(() => Array(3).fill("blue")),
  L: Array(3).fill(null).map(() => Array(3).fill("orange")),
  R: Array(3).fill(null).map(() => Array(3).fill("red")),
};

const ColorPickerCube = ({
  onChange,
}: {
  onChange?: (cube: CubeState) => void;
}) => {
  const [cube, setCube] = useState<CubeState>(defaultCube);
  const [selectedColor, setSelectedColor] = useState<string>("white");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleTileClick = (face: Face, row: number, col: number) => {
    const newCube = { ...cube };
    newCube[face] = cube[face].map((r, i) =>
      r.map((c, j) => (i === row && j === col ? selectedColor : c))
    );
    setCube(newCube);
    onChange?.(newCube);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(cubeColors).map(([name, hex]) => (
          <button
            key={name}
            onClick={() => handleColorClick(name)}
            title={`Select ${name} color`}
            aria-label={`Select ${name} color`}
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
              selectedColor === name ? 'border-black border-4 shadow-lg' : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{
              backgroundColor: hex,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        {Object.keys(cube).map((face) => (
          <div key={face} className="space-y-1">
            <div className="font-semibold text-center">{face} Face</div>
            <div className="grid grid-cols-3 gap-1">
              {cube[face as Face].map((row, rIdx) =>
                row.map((color, cIdx) => (
                  <button
                    key={`${face}-${rIdx}-${cIdx}`}
                    title={`${face} face, position ${rIdx + 1}-${cIdx + 1}: ${color}`}
                    aria-label={`Set ${face} face position ${rIdx + 1}-${cIdx + 1} to ${selectedColor}`}
                    className="w-6 h-6 border border-gray-400 hover:border-gray-600 transition-colors"
                    style={{ backgroundColor: cubeColors[color] || color }}
                    onClick={() =>
                      handleTileClick(face as Face, rIdx, cIdx)
                    }
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerCube;
