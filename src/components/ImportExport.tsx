import React from "react";
import { getSolves, saveSolves } from "../utils/storage";

const ImportExport: React.FC = () => {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(getSolves())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solves.json";
    a.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        saveSolves(data);
        alert("Imported successfully!");
      } catch {
        alert("Invalid file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={exportData} className="bg-green-600 p-2 rounded">
        Export Solves
      </button>
      <input type="file" accept=".json" onChange={importData} />
    </div>
  );
};

export default ImportExport;
