"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { searchShows } from "@/lib/tvmaze";
import type { Show } from "@/types/shows";

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query: string) {
    setLoading(true);
    try {
      const results = await searchShows(query);
      setShows(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bingeria</h1>
      <p className="mt-2 text-gray-500">Tvoj tracker TV serija</p>

      <div className="mt-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <p className="mt-4">Učitavanje...</p>}

      <ul className="mt-4 space-y-2">
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </main>
  );
}
