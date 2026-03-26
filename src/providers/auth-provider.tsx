'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';

interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null;
    return !!getCookie('byligg_token');
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = (token: string) => {
    setIsLoading(true);
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `byligg_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
    setIsAuthenticated(true);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    setIsLoading(true);
    document.cookie = 'byligg_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}