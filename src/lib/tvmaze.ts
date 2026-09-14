import type { Show, SearchResult } from "@/types/shows";

const BASE_URL = "https://api.tvmaze.com";

export async function searchShows(query: string): Promise<Show[]> {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
  );

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje podataka s TVmaze API-ja");
  }

  const results: SearchResult[] = await res.json();
  return results.map((result) => result.show);
}

export async function getShowById(id: string): Promise<Show> {
  const res = await fetch(`${BASE_URL}/shows/${id}`);

  if (!res.ok) {
    throw new Error("Serija nije pronađena");
  }

  return res.json();
}
