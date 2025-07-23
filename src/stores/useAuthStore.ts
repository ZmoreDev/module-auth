// stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  expiresAt: number | null;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkToken: () => void;
  refreshToken: () => Promise<void>;
  setError: (msg: string | null) => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      isLoggedIn: false,
      expiresAt: null,
      error: null,

      login: async (username, password) => {
        try {
          const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!res.ok) {
            set({ error: 'Invalid username or password' });
            return false;
          }

          const data = await res.json();
          set({
            token: data.token,
            username: data.username,
            isLoggedIn: true,
            expiresAt: Date.now() + data.expiresIn * 1000,
            error: null,
          });
          return true;
        } catch {
          set({ error: 'Network error' });
          return false;
        }
      },

      logout: () =>
        set({ token: null, username: null, isLoggedIn: false, expiresAt: null, error: null }),

      checkToken: async () => {
        const { expiresAt, logout, refreshToken } = get();
        if (!expiresAt) {
          logout();
          return;
        }

        const now = Date.now();
        const timeLeft = expiresAt - now;

        if (timeLeft < 5 * 60 * 1000 && timeLeft > 0) {
          console.log('Token about to expire, attempting to refresh...');
          await refreshToken(); // รอ refresh ก่อนตัดสินใจ logout
          return;
        }

        if (now > expiresAt) {
          console.log('Token expired');
          logout();
          return;
        }

        console.log('Token still valid');
      },

     refreshToken: async () => {
      const { token, logout } = get();
      try {
        const res = await fetch('http://localhost:3000/api/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          logout();
          return;
        }

        const data = await res.json();
        console.log('Refresh success', data); // ✅ ตรวจว่าได้ค่า token ใหม่และ expiresIn หรือไม่
        set({
          token: data.token,
          expiresAt: Date.now() + data.expiresIn * 1000,
          isLoggedIn: true,
        });
      } catch {
        logout();
      }
    },


      setError: (msg) => set({ error: msg }),
    }),
    { name: 'auth-store' }
  )
);
