// apps/frontend/src/lib/voice.ts

// Mapping for better pronunciation of cube moves
const movePronounciation: { [key: string]: string } = {
  // Basic moves
  'R': 'right',
  'L': 'left', 
  'U': 'up',
  'D': 'down',
  'F': 'front',
  'B': 'back',
  
  // Prime moves (counter-clockwise)
  "R'": 'right prime',
  "L'": 'left prime',
  "U'": 'up prime', 
  "D'": 'down prime',
  "F'": 'front prime',
  "B'": 'back prime',
  
  // Double moves (180 degrees)
  'R2': 'right two',
  'L2': 'left two',
  'U2': 'up two',
  'D2': 'down two', 
  'F2': 'front two',
  'B2': 'back two',
  
  // Wide moves
  'Rw': 'right wide',
  'Lw': 'left wide',
  'Uw': 'up wide',
  'Dw': 'down wide',
  'Fw': 'front wide',
  'Bw': 'back wide',
  
  // Wide prime moves
  "Rw'": 'right wide prime',
  "Lw'": 'left wide prime',
  "Uw'": 'up wide prime',
  "Dw'": 'down wide prime',
  "Fw'": 'front wide prime',
  "Bw'": 'back wide prime',
  
  // Wide double moves
  'Rw2': 'right wide two',
  'Lw2': 'left wide two',
  'Uw2': 'up wide two',
  'Dw2': 'down wide two',
  'Fw2': 'front wide two',
  'Bw2': 'back wide two',
  
  // Middle layer moves
  'M': 'middle',
  "M'": 'middle prime',
  'M2': 'middle two',
  'E': 'equatorial',
  "E'": 'equatorial prime',
  'E2': 'equatorial two',
  'S': 'standing',
  "S'": 'standing prime',
  'S2': 'standing two',
  
  // Rotations
  'x': 'x rotation',
  "x'": 'x rotation prime',
  'x2': 'x rotation two',
  'y': 'y rotation',
  "y'": 'y rotation prime', 
  'y2': 'y rotation two',
  'z': 'z rotation',
  "z'": 'z rotation prime',
  'z2': 'z rotation two',
};

// Function to convert algorithm notation to spoken text
function algorithmToSpeech(algorithm: string): string {
  // Split algorithm into individual moves
  const moves = algorithm.trim().split(/\s+/);
  
  // Convert each move to spoken form
  const spokenMoves = moves.map(move => {
    // Handle parentheses
    if (move.includes('(') || move.includes(')')) {
      return move.replace(/[()]/g, '');
    }
    
    // Look up in pronunciation dictionary
    if (movePronounciation[move]) {
      return movePronounciation[move];
    }
    
    // Fallback for unknown moves - try to parse them
    if (move.includes("'")) {
      const base = move.replace("'", '');
      return `${base.toLowerCase()} prime`;
    } else if (move.includes('2')) {
      const base = move.replace('2', '');
      return `${base.toLowerCase()} two`;
    } else {
      return move.toLowerCase();
    }
  });
  
  return spokenMoves.join(', ');
}

export function speak(text: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.8; // Slightly slower for clarity
  utterance.pitch = 1.0;
  utterance.volume = 0.8;
  
  speechSynthesis.speak(utterance);
}

export function speakAlgorithm(algorithm: string): void {
  const spokenText = algorithmToSpeech(algorithm);
  speak(spokenText);
}

export function speakCaseName(caseName: string, group: string): void {
  const text = `${group} case: ${caseName}`;
  speak(text);
}
