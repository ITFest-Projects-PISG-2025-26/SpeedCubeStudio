// apps/frontend/src/components/trainer/VoiceToggle.tsx
import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VoiceToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100 transition"
    >
      {enabled ? (
        <>
          <Volume2 className="h-4 w-4" />
          Voice On
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4" />
          Voice Off
        </>
      )}
    </button>
  );
};

export default VoiceToggle;
