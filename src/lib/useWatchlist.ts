"use client";

import { useEffect, useState } from "react";
import type { WatchlistItem } from "@/types/shows";

const STORAGE_KEY = "bingeria-watchlist";

function getInitialWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] =
    useState<WatchlistItem[]>(getInitialWatchlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(item: WatchlistItem) {
    setWatchlist((prev) => {
      if (prev.some((show) => show.id === item.id)) return prev;
      return [...prev, item];
    });
  }

  function removeFromWatchlist(id: number) {
    setWatchlist((prev) => prev.filter((show) => show.id !== id));
  }

  function updateStatus(id: number, status: WatchlistItem["status"]) {
    setWatchlist((prev) =>
      prev.map((show) => (show.id === id ? { ...show, status } : show)),
    );
  }

  function isInWatchlist(id: number) {
    return watchlist.some((show) => show.id === id);
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateStatus,
    isInWatchlist,
  };
}
