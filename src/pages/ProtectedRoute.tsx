import { isStore } from '@/stores/stores';
import { useAtom } from 'jotai';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth] = useAtom(isStore);
  const location = useLocation();

  console.log(isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
