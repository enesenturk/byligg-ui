'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from '@/lib/utils';
import { setUnauthorizedHandler, AUTH_TOKEN_COOKIE } from '@/lib/api';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null;
    return !!getCookie(AUTH_TOKEN_COOKIE);
  });
  const router = useRouter();

  const logout = useCallback(() => {
    deleteCookie(AUTH_TOKEN_COOKIE);
    setIsAuthenticated(false);
    router.push('/');
  }, [router]);

  const login = useCallback((token: string) => {
    setCookie(AUTH_TOKEN_COOKIE, token, TOKEN_MAX_AGE);
    setIsAuthenticated(true);
    router.push('/dashboard');
  }, [router]);

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
