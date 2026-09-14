"use client";

import { useWatchlist } from "@/lib/useWatchlist";
import type { Show } from "@/types/shows";

interface WatchlistButtonProps {
  show: Show;
}

export default function WatchlistButton({ show }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const added = isInWatchlist(show.id);

  function handleClick() {
    if (added) {
      removeFromWatchlist(show.id);
    } else {
      addToWatchlist({
        id: show.id,
        name: show.name,
        image: show.image?.medium ?? null,
        status: "planned",
      });
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`mt-4 rounded-md px-4 py-2 text-white ${
        added
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {added ? "Ukloni iz watchliste" : "Dodaj u watchlistu"}
    </button>
  );
}
