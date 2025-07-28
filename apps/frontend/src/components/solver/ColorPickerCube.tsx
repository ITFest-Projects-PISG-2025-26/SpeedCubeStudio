// apps/frontend/src/components/solver/ColorPickerCube.tsx
import React, { useState } from "react";
import { cubeColors } from "@/utils/colors";

type Face = "U" | "D" | "F" | "B" | "L" | "R";
type CubeState = Record<Face, string[][]>;

const defaultCube: CubeState = {
  U: Array(3).fill(Array(3).fill("white")),
  D: Array(3).fill(Array(3).fill("yellow")),
  F: Array(3).fill(Array(3).fill("green")),
  B: Array(3).fill(Array(3).fill("blue")),
  L: Array(3).fill(Array(3).fill("orange")),
  R: Array(3).fill(Array(3).fill("red")),
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
    const newFace = cube[face].map((r, i) =>
      r.map((c, j) => (i === row && j === col ? selectedColor : c))
    );
    const newCube = { ...cube, [face]: newFace };
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
            className="w-8 h-8 rounded-full border-2"
            style={{
              backgroundColor: hex,
              borderColor: selectedColor === name ? "#000" : "#ccc",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        {Object.keys(cube).map((face) => (
          <div key={face} className="space-y-1">
            <div className="font-semibold">{face}</div>
            <div className="grid grid-cols-3 gap-1">
              {cube[face as Face].map((row, rIdx) =>
                row.map((color, cIdx) => (
                  <button
                    key={`${face}-${rIdx}-${cIdx}`}
                    className="w-6 h-6 border"
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
