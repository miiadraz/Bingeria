import type { Show, SearchResult, Episode } from "@/types/shows";

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

export async function getShowById(id: string): Promise<Show | null> {
  const res = await fetch(`${BASE_URL}/shows/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje serije");
  }

  return res.json();
}

export async function getShowEpisodes(id: string): Promise<Episode[]> {
  const res = await fetch(`${BASE_URL}/shows/${id}/episodes`);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje epizoda");
  }

  return res.json();
}

export async function getCatalog(): Promise<Show[]> {
  const res = await fetch(`${BASE_URL}/shows?page=0`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Neuspjelo dohvaćanje kataloga");
  }

  const allShows: Show[] = await res.json();
  return allShows.slice(0, 24);
}
