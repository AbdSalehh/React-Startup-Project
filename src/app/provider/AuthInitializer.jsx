import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/entities/auth';

export const AuthInitializer = ({ children }) => {
  const { initializeAuth } = useAuthStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      initializeAuth();
    }
  }, [initializeAuth]);

  return <>{children}</>;
};
