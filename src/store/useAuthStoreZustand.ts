import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        username: null,
        isLoggedIn: false,

        login: async (username: string, password: string) => {
          if (username === 'admin' && password === '1234') {
            const fakeToken = 'fake-jwt-token.mock.payload';

            set({
              token: fakeToken,
              username,
              isLoggedIn: true,
            });
          } else {
            throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
          }
        },

        logout: () => {
          set({
            token: null,
            username: null,
            isLoggedIn: false,
          });
        },

        checkToken: () => {
          const token = get().token;
          if (token) {
            try {
              // Mock decode JWT
              const payload = token.split('.')[1];
              if (payload) {
                set({ isLoggedIn: true });
              } else {
                set({ token: null, isLoggedIn: false });
              }
            } catch (err) {
              set({ token: null, isLoggedIn: false });
            }
          }
        },
      }),
      {
        name: 'auth-storage', // ชื่อ key ใน localStorage
      }
    )
  )
);
