"use client";

import { useWatchlist } from "@/lib/useWatchlist";
import Image from "next/image";
import Link from "next/link";

const STATUS_LABELS = {
  watching: "Gledam",
  planned: "Planiram",
  completed: "Odgledano",
} as const;

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, updateStatus } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">Moja watchlista</h1>
        <p className="mt-4 text-gray-500">
          Još nema dodanih serija. Pretraži i dodaj neku!
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Moja watchlista</h1>

      <ul className="mt-6 space-y-3">
        {watchlist.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={84}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[84px] w-[60px] items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                Nema slike
              </div>
            )}

            <Link href={`/shows/${item.id}`} className="flex-1 font-semibold">
              {item.name}
            </Link>

            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(item.id, e.target.value as typeof item.status)
              }
              className="rounded-md border border-gray-300 px-2 py-1 text-black"
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => removeFromWatchlist(item.id)}
              className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
            >
              Ukloni
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
