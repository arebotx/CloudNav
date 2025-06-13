import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      if (!authStatus) {
        navigate('/admin/login', { replace: true });
      }
    };
    
    verifyAuth();
  }, [checkAuth, navigate]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default AuthGuard; 