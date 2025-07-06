// hooks/useAuth.ts
export function useAuth() {
  const token = localStorage.getItem('token');
  return { isLoggedIn: !!token };
}
