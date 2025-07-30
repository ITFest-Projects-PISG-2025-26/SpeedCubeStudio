// apps/frontend/src/components/trainer/VoiceToggle.tsx
import React from "react";

interface VoiceToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const VoiceToggle: React.FC<VoiceToggleProps> = ({ isEnabled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isEnabled);
  };

  // Check if speech synthesis is supported
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500">
        Voice not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Voice Guide</span>
      <button
        onClick={handleToggle}
        title={`${isEnabled ? 'Disable' : 'Enable'} voice guidance`}
        aria-label={`${isEnabled ? 'Disable' : 'Enable'} voice guidance`}
        aria-pressed={isEnabled ? 'true' : 'false'}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-xs text-gray-500">
        {isEnabled ? '🔊 On' : '🔇 Off'}
      </span>
    </div>
  );
};

export default VoiceToggle;
