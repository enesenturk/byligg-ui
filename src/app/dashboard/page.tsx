'use client';

import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ padding: '2rem', color: 'var(--theme-text-1)' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={logout} style={{
        padding: '0.5rem 1rem',
        background: 'var(--theme-accent)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
      }}>
        Logout
      </button>
    </div>
  );
}