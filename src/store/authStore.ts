import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    set({
      isLoading: false,
      isAuthenticated: true,
      user: {
        id: '1',
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
      },
    });
  },

  signup: async (name: string, email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 1200));
    set({
      isLoading: false,
      isAuthenticated: true,
      user: { id: '1', name, email },
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
