// apps/frontend/src/components/stats/StatsConfig.tsx
import React, { useState } from "react";
import { useSolveStore, StatConfig } from "../../lib/store";

interface StatsConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsConfig: React.FC<StatsConfigProps> = ({ isOpen, onClose }) => {
  const { statConfig, updateStatConfig } = useSolveStore();
  const [localConfig, setLocalConfig] = useState<StatConfig>(statConfig);

  if (!isOpen) return null;

  const handleToggle = (key: keyof StatConfig) => {
    if (key === 'targetTime') return; // Handle separately
    setLocalConfig(prev => ({
      ...prev,
      [key]: !(prev[key] as boolean),
    }));
  };

  const handleTargetTimeChange = (value: string) => {
    const timeInSeconds = parseFloat(value);
    if (!isNaN(timeInSeconds)) {
      setLocalConfig(prev => ({
        ...prev,
        targetTime: timeInSeconds * 1000, // Convert to milliseconds
      }));
    }
  };

  const handleSave = () => {
    updateStatConfig(localConfig);
    onClose();
  };

  const handleReset = () => {
    const defaultConfig: StatConfig = {
      showBest: true,
      showWorst: false,
      showMean: true,
      showAo5: true,
      showAo12: true,
      showAo50: false,
      showAo100: false,
      showAo1000: false,
      showMo3: false,
      showBpa: false,
      showWpa: false,
      showCurrent: true,
      showTarget: false,
      targetTime: 15000,
    };
    setLocalConfig(defaultConfig);
  };

  const statOptions = [
    { key: 'showBest', label: 'Best Time', description: 'Your fastest solve' },
    { key: 'showWorst', label: 'Worst Time', description: 'Your slowest solve' },
    { key: 'showMean', label: 'Mean', description: 'Average of all solves' },
    { key: 'showCurrent', label: 'Current Session', description: 'Average of recent solves' },
    { key: 'showMo3', label: 'Mo3', description: 'Mean of 3 (simple average)' },
    { key: 'showAo5', label: 'Ao5', description: 'Average of 5 (trimmed mean)' },
    { key: 'showAo12', label: 'Ao12', description: 'Average of 12' },
    { key: 'showAo50', label: 'Ao50', description: 'Average of 50' },
    { key: 'showAo100', label: 'Ao100', description: 'Average of 100' },
    { key: 'showAo1000', label: 'Ao1000', description: 'Average of 1000' },
    { key: 'showBpa', label: 'BPA', description: 'Best Possible Average' },
    { key: 'showWpa', label: 'WPA', description: 'Worst Possible Average' },
    { key: 'showTarget', label: 'Target Time', description: 'Track progress toward a goal' },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Statistics Configuration
            </h2>
            <button
              onClick={onClose}
              title="Close configuration"
              aria-label="Close statistics configuration"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {statOptions.map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={key}
                      checked={localConfig[key] as boolean}
                      onChange={() => handleToggle(key)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={key} className="font-medium text-gray-900 dark:text-white">
                      {label}
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
                    {description}
                  </p>
                </div>
              </div>
            ))}

            {localConfig.showTarget && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <label htmlFor="targetTime" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Target Time (seconds)
                </label>
                <input
                  type="number"
                  id="targetTime"
                  value={(localConfig.targetTime / 1000).toFixed(2)}
                  onChange={(e) => handleTargetTimeChange(e.target.value)}
                  step="0.01"
                  min="1"
                  max="600"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="15.00"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Set a target time to track your progress toward your goal
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
            >
              Reset to Defaults
            </button>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsConfig;
