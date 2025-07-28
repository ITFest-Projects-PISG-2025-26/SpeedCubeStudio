import React, { useState } from "react";
import Timer from "./components/Timer";
import ScrambleGenerator from "./components/ScrambleGenerator";
import SolveHistory from "./components/SolveHistory";
import Stats from "./components/Stats";
import ImportExport from "./components/ImportExport";
import Cube3DViewer from "./components/Cube3DViewer";
import VoiceScramble from "./components/VoiceScramble";
import QuizMode from "./components/QuizMode";
import Multiplayer from "./components/Multiplayer";

const App: React.FC = () => {
  const [view, setView] = useState("home");

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 items-center">
      <nav className="flex gap-2 flex-wrap justify-center">
        {["home", "stats", "history", "quiz", "import", "multiplayer"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </nav>

      {view === "home" && (
        <>
          <ScrambleGenerator />
          <VoiceScramble />
          <Timer />
          <Cube3DViewer />
        </>
      )}
      {view === "stats" && <Stats />}
      {view === "history" && <SolveHistory />}
      {view === "quiz" && <QuizMode />}
      {view === "import" && <ImportExport />}
      {view === "multiplayer" && <Multiplayer />}
    </div>
  );
};

export default App;
