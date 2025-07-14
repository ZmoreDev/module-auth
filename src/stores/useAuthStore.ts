// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      isLoggedIn: false,
      login: async (username, password) => {
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error('Invalid credentials');

        const data = await res.json();
        set({ token: data.token, username: data.username, isLoggedIn: true });
      },
      logout: () => set({ token: null, username: null, isLoggedIn: false }),
    }),
    { name: 'auth-storage' }
  )
);
