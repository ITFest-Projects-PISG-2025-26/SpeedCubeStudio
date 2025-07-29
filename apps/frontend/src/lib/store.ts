import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        // Check if we're on the client side before accessing localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        // Check if we're on the client side before accessing localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist on client side
      skipHydration: true,
    }
  )
);

interface RoomState {
  currentRoom: any;
  participants: any[];
  currentMatch: any;
  setCurrentRoom: (room: any) => void;
  setParticipants: (participants: any[]) => void;
  setCurrentMatch: (match: any) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  currentRoom: null,
  participants: [],
  currentMatch: null,
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setParticipants: (participants) => set({ participants }),
  setCurrentMatch: (match) => set({ currentMatch: match }),
  clearRoom: () => set({ currentRoom: null, participants: [], currentMatch: null }),
}));

// New Solve Data Types
export interface SolveRecord {
  id: string;
  time: number; // in milliseconds
  scramble: string;
  timestamp: Date;
  dnf?: boolean;  // Did Not Finish
  plus2?: boolean; // +2 penalty
  comment?: string;
}

export interface StatConfig {
  showBest: boolean;
  showWorst: boolean;
  showMean: boolean;
  showAo5: boolean;
  showAo12: boolean;
  showAo50: boolean;
  showAo100: boolean;
  showAo1000: boolean;
  showMo3: boolean; // Mean of 3
  showBpa: boolean; // Best Personal Average
  showWpa: boolean; // Worst Personal Average
  showCurrent: boolean; // Current session average
  showTarget: boolean; // Target time
  targetTime: number; // Target time in milliseconds
}

export interface Statistics {
  best: number | null;
  worst: number | null;
  mean: number | null;
  count: number;
  ao5: number | null;
  ao12: number | null;
  ao50: number | null;
  ao100: number | null;
  ao1000: number | null;
  mo3: number | null;
  bpa: number | null;
  wpa: number | null;
  current: number | null;
  deviation: number | null;
}

interface SolveState {
  solves: SolveRecord[];
  statistics: Statistics;
  statConfig: StatConfig;
  addSolve: (time: number, scramble: string, dnf?: boolean, plus2?: boolean) => void;
  deleteSolve: (id: string) => void;
  updateSolve: (id: string, updates: Partial<SolveRecord>) => void;
  clearSolves: () => void;
  updateStatConfig: (config: Partial<StatConfig>) => void;
  calculateStatistics: () => void;
}

// Helper functions for statistics calculations
const calculateAverage = (times: number[], count: number): number | null => {
  if (times.length < count) return null;
  
  const recentTimes = times.slice(-count);
  if (count <= 3) {
    // For Mo3 and smaller, use simple mean
    return recentTimes.reduce((sum, time) => sum + time, 0) / recentTimes.length;
  } else {
    // For Ao5+, remove best and worst times
    const sorted = [...recentTimes].sort((a, b) => a - b);
    const trimmed = sorted.slice(1, -1); // Remove first (best) and last (worst)
    return trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
  }
};

const calculateBestAverage = (times: number[], count: number): number | null => {
  if (times.length < count) return null;
  
  let bestAvg = Infinity;
  for (let i = count - 1; i < times.length; i++) {
    const segment = times.slice(i - count + 1, i + 1);
    const avg = calculateAverage(segment, count);
    if (avg && avg < bestAvg) {
      bestAvg = avg;
    }
  }
  
  return bestAvg === Infinity ? null : bestAvg;
};

export const useSolveStore = create<SolveState>()(
  persist(
    (set, get) => ({
      solves: [],
      statistics: {
        best: null,
        worst: null,
        mean: null,
        count: 0,
        ao5: null,
        ao12: null,
        ao50: null,
        ao100: null,
        ao1000: null,
        mo3: null,
        bpa: null,
        wpa: null,
        current: null,
        deviation: null,
      },
      statConfig: {
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
        targetTime: 15000, // 15 seconds default
      },
      
      addSolve: (time, scramble, dnf = false, plus2 = false) => {
        const adjustedTime = plus2 ? time + 2000 : time; // Add 2 seconds for +2 penalty
        const solve: SolveRecord = {
          id: `solve_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          time: adjustedTime,
          scramble,
          timestamp: new Date(),
          dnf,
          plus2,
        };
        
        set((state) => ({
          solves: [...state.solves, solve],
        }));
        
        // Recalculate statistics
        get().calculateStatistics();
      },
      
      deleteSolve: (id) => {
        set((state) => ({
          solves: state.solves.filter(solve => solve.id !== id),
        }));
        get().calculateStatistics();
      },
      
      updateSolve: (id, updates) => {
        set((state) => ({
          solves: state.solves.map(solve => 
            solve.id === id ? { ...solve, ...updates } : solve
          ),
        }));
        get().calculateStatistics();
      },
      
      clearSolves: () => {
        set({ 
          solves: [],
          statistics: {
            best: null,
            worst: null,
            mean: null,
            count: 0,
            ao5: null,
            ao12: null,
            ao50: null,
            ao100: null,
            ao1000: null,
            mo3: null,
            bpa: null,
            wpa: null,
            current: null,
            deviation: null,
          }
        });
      },
      
      updateStatConfig: (config) => {
        set((state) => ({
          statConfig: { ...state.statConfig, ...config },
        }));
      },
      
      calculateStatistics: () => {
        const { solves } = get();
        const validSolves = solves.filter(solve => !solve.dnf);
        const times = validSolves.map(solve => solve.time);
        
        if (times.length === 0) {
          set({
            statistics: {
              best: null,
              worst: null,
              mean: null,
              count: 0,
              ao5: null,
              ao12: null,
              ao50: null,
              ao100: null,
              ao1000: null,
              mo3: null,
              bpa: null,
              wpa: null,
              current: null,
              deviation: null,
            }
          });
          return;
        }
        
        const best = Math.min(...times);
        const worst = Math.max(...times);
        const mean = times.reduce((sum, time) => sum + time, 0) / times.length;
        const count = times.length;
        
        // Calculate standard deviation
        const variance = times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / times.length;
        const deviation = Math.sqrt(variance);
        
        // Calculate averages
        const ao5 = calculateAverage(times, 5);
        const ao12 = calculateAverage(times, 12);
        const ao50 = calculateAverage(times, 50);
        const ao100 = calculateAverage(times, 100);
        const ao1000 = calculateAverage(times, 1000);
        const mo3 = calculateAverage(times, 3);
        
        // Calculate best personal averages
        const bpa = calculateBestAverage(times, 5); // Best Personal Ao5
        const wpa = calculateBestAverage(times.map(t => -t), 5); // Worst Personal Ao5 (inverted)
        
        // Current session average (last 12 solves or all if less)
        const sessionSize = Math.min(12, times.length);
        const current = calculateAverage(times, sessionSize);
        
        set({
          statistics: {
            best,
            worst,
            mean,
            count,
            ao5,
            ao12,
            ao50,
            ao100,
            ao1000,
            mo3,
            bpa,
            wpa: wpa ? -wpa : null,
            current,
            deviation,
          }
        });
      },
    }),
    {
      name: 'solve-storage',
      skipHydration: true,
    }
  )
);
