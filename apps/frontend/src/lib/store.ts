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
