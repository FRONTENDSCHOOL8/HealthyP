import { db } from '@/api/pocketbase';
import { isStore } from '@/stores/stores';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useAtom(isStore);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isExistStore = !!localStorage.getItem('autoLogin');

  let userEmail = '';
  let userPassword = '';

  if (isExistStore) {
    const autoLoginRaw = localStorage.getItem('autoLogin');
    const autoLogin = autoLoginRaw ? JSON.parse(autoLoginRaw) : false;

    userEmail = autoLogin ? autoLogin.email : '';
    userPassword = autoLogin ? autoLogin.password : '';
  }

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        setIsAuth(true);
        await db.collection('users').authWithPassword(userEmail, userPassword);
      } catch (error) {
        console.error('로그인 에러: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsAuth, userEmail, userPassword]);

  if (isLoading || isAuth) {
    return children;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}
