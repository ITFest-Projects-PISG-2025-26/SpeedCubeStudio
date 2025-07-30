import React, { useState, useEffect } from "react";
import CaseImage from "../../components/trainer/CaseImage";
import TrainerFilters from "../../components/trainer/TrainerFilters";
import VoiceToggle from "../../components/trainer/VoiceToggle";
import { Header } from "../../components/Header";
import { useVoice } from "../../hooks/useVoice";

// Import CFOP data
import { ollCases, pllCases, f2lCases, CFOPCase } from "../../lib/cfopData";

const cfopData: { [key: string]: CFOPCase[] } = {
  OLL: ollCases,
  PLL: pllCases,
  F2L: f2lCases,
};

export default function TrainerPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("OLL");
  const [currentCase, setCurrentCase] = useState<CFOPCase | null>(null);
  const [showAlgorithm, setShowAlgorithm] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number>(0);
  
  // Use the improved voice hook
  const { enabled: isVoiceEnabled, toggle: toggleVoice, speakCaseWithName, speakAlgorithmText } = useVoice();

  // Load cases for selected group
  const cases = cfopData[selectedGroup] || [];

  // Get random case from selected group
  const getRandomCase = () => {
    if (cases.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cases.length);
    const newCase = cases[randomIndex];
    setCurrentCase(newCase);
    setShowAlgorithm(false);
    setSelectedAlgorithm(0);
    
    // Voice announcement with improved pronunciation 
    speakCaseWithName(newCase.name, selectedGroup);
  };

  // Initialize with first case
  useEffect(() => {
    if (cases.length > 0 && !currentCase) {
      getRandomCase();
    }
  }, [selectedGroup, cases]);

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    setCurrentCase(null);
  };

  const handleShowAlgorithm = () => {
    setShowAlgorithm(true);
    
    // Voice announcement of algorithm with improved pronunciation
    if (currentCase) {
      const algorithm = currentCase.algorithms[selectedAlgorithm];
      speakAlgorithmText(algorithm);
    }
  };

  const handleRepeatAlgorithm = () => {
    if (currentCase) {
      const algorithm = currentCase.algorithms[selectedAlgorithm];
      speakAlgorithmText(algorithm);
    }
  };

  const handleNextCase = () => {
    getRandomCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">CFOP Trainer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice your {selectedGroup} algorithms with visual cases
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Controls */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Algorithm Group</h3>
              <TrainerFilters 
                selectedGroup={selectedGroup} 
                onSelectGroup={handleGroupSelect} 
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Voice Guide</h3>
                <VoiceToggle 
                  isEnabled={isVoiceEnabled}
                  onToggle={toggleVoice}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable voice announcements for case names and algorithms
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total {selectedGroup} cases:</span>
                  <span className="font-semibold">{cases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current case:</span>
                  <span className="font-semibold">{currentCase?.id || '--'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Case Display */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow">
              {currentCase ? (
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentCase.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{currentCase.id}</p>
                  </div>

                  {/* Case Image */}
                  <div className="flex justify-center">
                    <CaseImage 
                      imageUrl={currentCase.image}
                      altText={`${currentCase.name} case diagram`}
                    />
                  </div>

                  {/* Algorithm Section */}
                  <div className="space-y-4">
                    {!showAlgorithm ? (
                      <button
                        onClick={handleShowAlgorithm}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Show Algorithm
                      </button>
                    ) : (
                      <div className="space-y-3">
                        {currentCase.algorithms.length > 1 && (
                          <div className="flex justify-center gap-2">
                            {currentCase.algorithms.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedAlgorithm(index)}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                  selectedAlgorithm === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                              >
                                Alg {index + 1}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                          <code className="text-lg font-mono">
                            {currentCase.algorithms[selectedAlgorithm]}
                          </code>
                        </div>
                        
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setShowAlgorithm(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Hide Algorithm
                          </button>
                          {isVoiceEnabled && (
                            <button
                              onClick={handleRepeatAlgorithm}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              🔊 Repeat
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4 justify-center pt-4">
                    <button
                      onClick={handleNextCase}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Next Case
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Loading {selectedGroup} cases...</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get ready to practice your algorithms!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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
