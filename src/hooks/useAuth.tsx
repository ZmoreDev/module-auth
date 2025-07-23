// src/hooks/useAuth.ts
import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  return useAuthStore();
}
