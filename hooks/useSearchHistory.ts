'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'persian-shop:search-history';
const MAX_ITEMS = 6;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const addTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, MAX_ITEMS);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addTerm, clearHistory };
}
