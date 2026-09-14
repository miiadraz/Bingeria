"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ShowCard from "@/components/ShowCard";
import { searchShows } from "@/lib/tvmaze";
import type { Show } from "@/types/shows";

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    try {
      const results = await searchShows(query);
      setShows(results);
    } catch (err) {
      setError("Greška prilikom pretrage. Pokušaj ponovno.");
      setShows([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bingeria</h1>
      <p className="mt-2 text-gray-500">Tvoj tracker TV serija</p>

      <div className="mt-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <p className="mt-4 text-gray-500">Učitavanje...</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && hasSearched && shows.length === 0 && (
        <p className="mt-4 text-gray-500">Nema rezultata za tu pretragu.</p>
      )}

      <ul className="mt-4 space-y-2">
        {shows.map((show) => (
          <li key={show.id}>
            <ShowCard show={show} />
          </li>
        ))}
      </ul>
    </main>
  );
}
