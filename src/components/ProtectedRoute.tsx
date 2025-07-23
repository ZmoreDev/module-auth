import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn, checkToken, refreshToken, expiresAt } = useAuth();

  console.log('ProtectedRoute render', { isLoggedIn, expiresAt });

  useEffect(() => {
    if (isLoggedIn) {
      console.log('useEffect checkToken() called');
      checkToken();
    }
  }, [isLoggedIn]);


  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const timeLeft = expiresAt - Date.now();
      console.log('⏰ Time left:', timeLeft / 1000, 'seconds');

      if (timeLeft < 30 * 1000 && timeLeft > 0) {
        console.log('🔄 Refreshing token...');
        refreshToken();
      }
    }, 10 * 1000); // ตรวจทุก 10 วินาที

    return () => clearInterval(interval);
  }, [expiresAt, refreshToken]);


  if (!isLoggedIn) {
    console.log('User is not logged in, redirecting...');
    return <Navigate to="/login" replace />;
  }

  return children;
}



