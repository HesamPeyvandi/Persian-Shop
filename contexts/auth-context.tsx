'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthUser, UserProfile } from '@/types';
import { api } from '@/services/api';

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'persian-shop:auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (username, password) => {
        setLoading(true);
        try {
          const { token } = await api.login(username, password);
          // اگر قبلا برای همین کاربر اطلاعات پروفایل ذخیره شده باشد، حفظش می‌کنیم
          const existingProfile = user?.username === username ? user.profile : undefined;
          const authUser: AuthUser = { username, token, profile: existingProfile };
          setUser(authUser);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
          return authUser;
        } finally {
          setLoading(false);
        }
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem(STORAGE_KEY);
      },
      updateProfile: (profile) => {
        setUser((prev) => {
          if (!prev) return prev;
          const next: AuthUser = { ...prev, profile };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          return next;
        });
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
