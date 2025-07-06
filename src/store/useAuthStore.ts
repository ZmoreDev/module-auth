// useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === 'admin' && password === '1234') {
      const fakeToken = 'fake-jwt-token';
      set({ token: fakeToken, username, isLoading: false, error: null });
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('username', username);
    } else {
      set({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', isLoading: false });
    }
  },

  logout: () => {
    set({ token: null, username: null });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },
}));
