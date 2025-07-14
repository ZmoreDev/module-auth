// src/hooks/useAuth.ts
import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  const { token, username, isLoggedIn, login, logout } = useAuthStore();
  return { token, username, isLoggedIn, login, logout };
}
